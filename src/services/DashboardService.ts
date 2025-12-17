import { API_ENDPOINTS } from '../constants';
import type { PaginatedResponse } from '../types/ApiResponse';
import type { CourseDto } from '../types/CourseType';
import { axiosInstance } from './AxiosInstant';

interface MyCoursesParams {
  status?: 'inprogress' | 'finished' | 'upcoming';
  page?: number;
  per_page?: number;
}

interface ScheduleResponse {
  week_start: string;
  week_end: string;
  courses: CourseDto[];
}

const getMyCourses = async (params?: MyCoursesParams): Promise<PaginatedResponse<CourseDto>> => {
  const response = await axiosInstance.get<PaginatedResponse<CourseDto>>(
    API_ENDPOINTS.DASHBOARD.MY_COURSES,
    { params }
  );
  return response.data;
};

const getSchedule = async (): Promise<ScheduleResponse> => {
  const response = await axiosInstance.get<ScheduleResponse>(
    API_ENDPOINTS.DASHBOARD.SCHEDULE
  );
  return response.data;
};

const dashboardService = {
  getMyCourses,
  getSchedule,
};

export default dashboardService;
