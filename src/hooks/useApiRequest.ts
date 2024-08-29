import { useState } from "react";
import axios, { AxiosError } from "axios";
import { UseApiRequestParams } from "../interfaces/api/UseApiRequestParams";
import { UseApiRequestReturn } from "../interfaces/api/UseApiRequestReturn";

export function useApiRequest<T = any, R = any>(
  params: UseApiRequestParams<T, R>
): UseApiRequestReturn<R> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<R | null>(null);

  const execute = async (
    overrideParams: Partial<UseApiRequestParams<T, R>> = {}
  ) => {
    const {
      url,
      method = "GET",
      data,
      config = {},
      onSuccess,
      onError,
      fetchCsrf = false,
    } = { ...params, ...overrideParams };

    try {
      setLoading(true);
      setError(null);

      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      if (fetchCsrf) {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      }

      const response = await axios.request<R>({
        url,
        method,
        data,
        ...config,
      });

      setResponseData(response.data);

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      const axiosErr = err as AxiosError;
      setError(axiosErr.message);

      if (onError) {
        onError(axiosErr);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data: responseData, execute };
}
