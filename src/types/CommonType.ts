export type MediaType = 'IMAGE' | 'VIDEO';

export interface ItemError {
  field: string;
  message: string;
}

export interface ErrorResponseDto {
  message: string;
  code?: string;
  details?: any;
}


export interface ApiDataWrapper<T> {
    data: T;
}