import { ENDPOINT } from '@/constant/endpoint.const';
import { TENANT_ID_KEY } from '@/constant/global-key.const';
import AuthService from '@/service/auth.service';
import axios from 'axios';

export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(async (req) => {
  const token = AuthService.getAccessToken();
  req.baseURL = ENDPOINT.API_BASE_URL;
  req.headers.Authorization = token ? `Bearer ${token}` : null;
  if (!(req.data instanceof FormData)) {
    req.headers['Content-Type'] = 'application/json';
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Check for token-related errors
    if (status === 401 || status === 403) {
      // Optional: check error message for more granularity
      const message = error.response?.data?.message || '';

      if (
        message.includes('Token expired') ||
        message.includes('Invalid token') ||
        status === 401
      ) {
        AuthService.logoutUser(); 
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

// NOTE: For file upload
export const axiosInstanceUploadDocument = axios.create();
axiosInstanceUploadDocument.interceptors.request.use(async (req) => {
  const token = AuthService.getAccessToken();
  req.baseURL = ENDPOINT.API_BASE_URL;
  req.headers.Authorization = token ? `Bearer ${token}` : null;
  req.headers['TenantId'] = localStorage.getItem(TENANT_ID_KEY);

  if (!(req.data instanceof FormData)) {
    req.headers['Content-Type'] = 'application/json';
  }
  return req;
});

// NOTE: For python
export const pythonAxiosInstance = axios.create();
pythonAxiosInstance.interceptors.request.use(async (req) => {
  req.withCredentials = false;
  // req.baseURL = ENDPOINT.SOCIAL_MEDIA.API.PYTHON_API.BASE;
  req.headers['Content-Type'] = 'application/json';
  return req;
});
