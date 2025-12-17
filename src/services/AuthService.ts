import { API_ENDPOINTS } from '../constants';
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from '../types/AuthType';
import type { BaseUserDto } from '../types/UserType';
import { axiosInstance, axiosNoAuthInstance } from './AxiosInstant';

const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosNoAuthInstance.post<LoginResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    loginRequest
  );
  return response.data;
};

const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await axiosNoAuthInstance.post<RefreshTokenResponse>(
    API_ENDPOINTS.AUTH.REFRESH
  );
  return response.data;
};

const logout = async (): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
};

const getProfile = async (): Promise<{ user: BaseUserDto }> => {
  const response = await axiosInstance.get<{ user: BaseUserDto }>(
    API_ENDPOINTS.AUTH.ME
  );
  return response.data;
};

const authService = {
  login,
  refreshToken,
  getProfile,
  logout,
};

export default authService;