export type APIResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  retries?: number;
  retryDelay?: number;
}