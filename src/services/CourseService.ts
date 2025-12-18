import { API_ENDPOINTS } from '../constants';
import type { ApiResponse, PaginatedResponse } from '../types/ApiResponse';
import type { ApiDataWrapper } from '../types/CommonType';
import type {
  CourseDetailDto,
  CourseDto,
  CourseFilterParams,
  CreateCourseRequest,
  UpdateCourseRequest
} from '../types/CourseType';
import type { BaseUserDto } from '../types/UserType';
import { axiosInstance } from './AxiosInstant';

const getCourses = async (params?: CourseFilterParams): Promise<PaginatedResponse<CourseDto>> => {
  const response = await axiosInstance.get<PaginatedResponse<CourseDto>>(
    API_ENDPOINTS.COURSES.BASE,
    { params }
  );
  return response.data;
};

const getCourseDetail = async (id: number): Promise<CourseDetailDto> => {
  const response = await axiosInstance.get<CourseDetailDto>(
    API_ENDPOINTS.COURSES.DETAIL(id)
  );
  return response.data;
};

const createCourse = async (data: CreateCourseRequest): Promise<CourseDto> => {
  const response = await axiosInstance.post<CourseDto>(
    API_ENDPOINTS.COURSES.BASE,
    data
  );
  return response.data;
};

const updateCourse = async (id: number, data: UpdateCourseRequest): Promise<CourseDto> => {
  const response = await axiosInstance.put<CourseDto>(
    API_ENDPOINTS.COURSES.DETAIL(id),
    data
  );
  return response.data;
};

const enrollCourse = async (courseId: number, userId: number): Promise<ApiResponse<{ message: string }>> => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>(
    API_ENDPOINTS.COURSES.ENROLL(courseId),
    { user_id: userId }
  );
  return response.data;
};

const getCourseStudents = async (courseId: number): Promise<BaseUserDto[]> => {
  try {
    const response = await axiosInstance.get<ApiDataWrapper<BaseUserDto[]>>(
      API_ENDPOINTS.COURSES.STUDENTS(courseId)
    );
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    return [];
  }
};

const courseService = {
  getCourses,
  getCourseDetail,
  createCourse,
  updateCourse,
  enrollCourse,
  getCourseStudents,
};

export default courseService;
