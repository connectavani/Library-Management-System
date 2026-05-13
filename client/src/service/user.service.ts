import { ENDPOINT } from '@/constant/endpoint.const';
import { UserModel } from '@/interface/user.model';
import { axiosInstance } from '@/utils/axios.util';

export default class UserService {
  static fetchUser = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.USERS.API.FETCH_USER,
    );
  };
  static updateUser = (param: UserModel) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.USERS.API.UPDATE + '/' + param?._id,
      param,
    );
  };
  static fetchUserById = (param: String) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.USERS.API.FETCH_USER_BY_ID + '/' + param,
    );
  };

  static addUser = (param: UserModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.USERS.API.ADD,
      param,
    );
  };
  static userAction = (param: UserModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.USERS.API.USER_ACTION +
        '/' +
        param?.userId +
        '/' +
        param.isAuthenticated,
    );
  };
}
