import { API_ENDPOINTS } from '../constants';
import type { ApiDataWrapper } from '../types/CommonType';
import type { UserDto } from '../types/UserType';
import { axiosInstance } from './AxiosInstant';

const getProfile = async (): Promise<UserDto> => {
  const response = await axiosInstance.get<ApiDataWrapper<UserDto>>(
    API_ENDPOINTS.USER.PROFILE
  );
  return response.data.data;
};

const updateProfile = async (data: Partial<UserDto>): Promise<UserDto> => {
  const response = await axiosInstance.put<ApiDataWrapper<UserDto>>(
    API_ENDPOINTS.USER.PROFILE,
    data
  );
  return response.data.data;
};

const userService = {
  getProfile,
  updateProfile,
};

export default userService;
