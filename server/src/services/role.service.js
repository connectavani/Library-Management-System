import roleModel from '../models/role.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';

class RoleService {
  // Create a new role
  async createRole(roleData) {
    try {
      const role = await roleModel.create(roleData);
      return role;
    } catch (error) {
      throw new ErrorHandler(error.message, 500);
    }
  }

  // Get all roles
  async getAllRoles() {
    try {
      const roles = await roleModel.find().lean();
      return roles;
    } catch (error) {
      throw new ErrorHandler(error.message, 500);
    }
  }

  // Get a role by ID
  async getRoleById(roleId) {
    try {
      const role = await roleModel.findById(roleId).lean();
      if (!role) {
        throw new ErrorHandler('Role not found', 404);
      }
      return role;
    } catch (error) {
      throw new ErrorHandler(error.message, 500);
    }
  }

  // Update a role
  async updateRole(roleId, roleData) {
    try {
      const updatedRole = await roleModel
        .findByIdAndUpdate(roleId, roleData, { new: true })
        .lean();
      if (!updatedRole) {
        throw new ErrorHandler('Role not found', 404);
      }
      return updatedRole;
    } catch (error) {
      throw new ErrorHandler(error.message, 500);
    }
  }

  // Delete a role
  async deleteRole(roleId) {
    try {
      const deletedRole = await roleModel.findByIdAndDelete(roleId).lean();
      if (!deletedRole) {
        throw new ErrorHandler('Role not found', 404);
      }
      return deletedRole;
    } catch (error) {
      throw new ErrorHandler(error.message || 'Error deleting role', 500);
    }
  }

  async getRoleIdByRoleName() {
    try {
      return await roleModel.findOne({ roleName: 'Individual' });
    } catch (error) {
      throw new ErrorHandler(`Failed to get roles ${error.message}`, 400);
    }
  }
}

export default new RoleService();
