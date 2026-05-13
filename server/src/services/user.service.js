import userModel from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';

class UserService {
  async create(data) {
    try {
      const user = new userModel(data);
      return await user.save();
    } catch (error) {
      throw new ErrorHandler(error.message, 400);
    }
  }

  async findUser(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw new ErrorHandler(error.message, 400);
    }
  }
    async getAll() {
      try {
        const user = await userModel.find().lean();
        return user;
      } catch (error) {
        throw new ErrorHandler(error.message, 500);
      }
    }

  async getUserById(userId) {
    try {
      const user = await userModel
        .findOne({ _id: userId, isDeleted: false, roleName: { $ne: 'Admin' } })
        .select('-password -resetPasswordToken -resetPasswordExpire')
        .lean();

      if (!user) {
        throw new ErrorHandler('User not found', 404);
      }

      const school = await schoolModel
        .findOne({ userId: userId })
        .select('schoolName address city state principalContactNumber userId')
        .lean();

      const result = {
        ...user,
        schoolName: school ? school.schoolName : null,
        schoolAddress: school ? school.address : null,
        schoolCity: school ? school.city : null,
        schoolState: school ? school.state : null,
        schoolPrincipalContactNumber: school
          ? school.principalContactNumber
          : null,
        schoolPrincipalName: school ? school.principalName : null,
      };

      return result;
    } catch (error) {
      throw new ErrorHandler(error.message, 400);
    }
  }

  async userAction(id, isAuthenticated) {
    try {
      return await userModel.findByIdAndUpdate(id, {
        isAuthenticated,
      });
    } catch (error) {
      throw new ErrorHandler(error.message, 400);
    }
  }

  async getUserByRoleId(roleId) {
    try {
      return await userModel
        .find(roleId)
        .select('_id email isAuthenticated');

    } catch (error) {
      throw new ErrorHandler(`Failed to get User ${error.message}`, 400);
    }
  }
}

export default new UserService();
