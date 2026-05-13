import { ENDPOINT } from '@/constant/endpoint.const';
import { axiosInstance } from '@/utils/axios.util';

export default class RegisterService {
  static registerUser = (params: any) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.AUTH.API.signup,
      params,
    );
  };

  static fetchDataById = (param: string) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.AUTH.API.fetchData +
        '/' +
        param,
    );
  };

    static updateRegisterUser = (params: any) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.AUTH.API.updateData,
      params,
    );
  };
}
