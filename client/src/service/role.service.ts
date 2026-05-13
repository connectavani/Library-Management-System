import { ENDPOINT } from '@/constant/endpoint.const';
import { RoleModel } from '@/interface/role';
import { axiosInstance } from '@/utils/axios.util';

export default class RoleService {
  static addRole = (param: RoleModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.ADD,
      param,
    );
  };
    static updateRole = (param: RoleModel) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ROLE.API.UPDATE +
        "/" +
        param?._id,
      param
    );
  };
  static fetchRole = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.FETCH_ROLE,
    );
  };
  static fetchRoleById = (param: String) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.FETCH_ROLE_BY_ID + '/' + param,
    );
  };
  static deleteRoleById = (_id: any) => {
    return axiosInstance.delete(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.DELETE + '/' + _id,
    );
  };
}
