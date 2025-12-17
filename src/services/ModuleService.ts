import { API_ENDPOINTS } from '../constants';
import type { ApiResponse } from '../types/ApiResponse';
import type { ModuleDto } from '../types/ModuleType';
import { axiosInstance } from './AxiosInstant';

interface ModulesResponse {
  course_info: {
    id: number;
    fullname: string;
    teacher: string;
  };
  sections: Array<{
    title: string;
    modules: ModuleDto[];
  }>;
}

const getCourseModules = async (courseId: number): Promise<ModulesResponse> => {
  const response = await axiosInstance.get<ModulesResponse>(
    API_ENDPOINTS.MODULES.BY_COURSE(courseId)
  );
  return response.data;
};

const getModuleDetail = async (moduleId: number): Promise<ModuleDto> => {
  const response = await axiosInstance.get<ModuleDto>(
    API_ENDPOINTS.MODULES.DETAIL(moduleId)
  );
  return response.data;
};

const createModule = async (courseId: number, data: Partial<ModuleDto>): Promise<ModuleDto> => {
  const response = await axiosInstance.post<ModuleDto>(
    API_ENDPOINTS.MODULES.BY_COURSE(courseId),
    data
  );
  return response.data;
};

const updateModule = async (moduleId: number, data: Partial<ModuleDto>): Promise<ModuleDto> => {
  const response = await axiosInstance.put<ModuleDto>(
    API_ENDPOINTS.MODULES.DETAIL(moduleId),
    data
  );
  return response.data;
};

const deleteModule = async (moduleId: number): Promise<ApiResponse<{ message: string }>> => {
  const response = await axiosInstance.delete<ApiResponse<{ message: string }>>(
    API_ENDPOINTS.MODULES.DETAIL(moduleId)
  );
  return response.data;
};

const moduleService = {
  getCourseModules,
  getModuleDetail,
  createModule,
  updateModule,
  deleteModule,
};

export default moduleService;
