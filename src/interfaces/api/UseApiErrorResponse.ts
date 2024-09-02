export interface UseApiErrorResponse {
  message: string;
  errors: {
    [key: string]: string[];
  };
}
