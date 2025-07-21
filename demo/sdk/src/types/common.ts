// Common types shared across different services

export interface Paginated<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
}

export interface BaseEntity {
  id: string;
  created_time: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
