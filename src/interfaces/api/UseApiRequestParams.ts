import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface UseApiRequestParams<T, R> {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: T;
  config?: AxiosRequestConfig;
  onSuccess?: (response: AxiosResponse<R>) => void;
  onError?: (error: AxiosError) => void;
  withCredentials?: boolean;
  fetchCsrf?: boolean;
}
