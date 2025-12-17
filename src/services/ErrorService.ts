import type { AxiosError } from 'axios';
import type { ErrorResponseDto } from '../types/CommonType';

export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<ErrorResponseDto>;
    console.log('Axios error detected:', axiosError);
    // Try to get message from response.data.message
    if (axiosError.response?.data?.message) {
        console.log('Error message from response data:', axiosError.response.data.message);
      return translateErrorMessage(axiosError.response.data.message);
    }
    
    // Fallback to error message
    if (axiosError.message) {
      return axiosError.message;
    }
  
  // Handle regular Error objects
  if (error instanceof Error) {
    return error.message;
  }
  
  // Fallback for unknown error types
  return 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
};

// Type guard to check if error is AxiosError
const isAxiosError = (error: unknown): error is AxiosError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as any).isAxiosError === true
  );
};

// Translate common error codes to Vietnamese
const translateErrorMessage = (message: string): string => {
    console.log('Translating error message:', message);
  const errorMessages: Record<string, string> = {
    'INVALID_CREDENTIALS': 'Tên đăng nhập hoặc mật khẩu không chính xác',
    'USER_INACTIVE': 'Tài khoản đã bị vô hiệu hóa',
    'TOKEN_INVALID_OR_EXPIRED': 'Token không hợp lệ hoặc đã hết hạn',
    'UNAUTHORIZED': 'Bạn không có quyền truy cập',
    'FORBIDDEN': 'Truy cập bị từ chối',
    'NOT_FOUND': 'Không tìm thấy dữ liệu',
    'INTERNAL_SERVER_ERROR': 'Lỗi server. Vui lòng thử lại sau',
    'BAD_REQUEST': 'Yêu cầu không hợp lệ',
  };
  
  return errorMessages[message] || message;
};

export const getErrorCode = (error: unknown): string | undefined => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponseDto>;
    return axiosError.response?.data?.code || axiosError.code;
  }
  return undefined;
};

export const getErrorDetails = (error: unknown): any => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponseDto>;
    return axiosError.response?.data?.details;
  }
  return undefined;
};

export const getErrorStatus = (error: unknown): number | undefined => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status;
  }
  return undefined;
};

const errorService = {
  getErrorMessage,
  getErrorCode,
  getErrorDetails,
  getErrorStatus,
};

export default errorService;
