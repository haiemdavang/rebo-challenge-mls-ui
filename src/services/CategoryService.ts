import { API_ENDPOINTS } from '../constants';
import type { CategoryDto } from '../types/CategoryType';
import { axiosInstance } from './AxiosInstant';

const getCategories = async (): Promise<CategoryDto[]> => {
  const response = await axiosInstance.get<CategoryDto[]>(
    API_ENDPOINTS.CATEGORIES.BASE
  );
  return response.data;
};

const categoryService = {
  getCategories,
};

export default categoryService;
