import { useState, useEffect, useCallback, useMemo } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { UseApiOptions } from "../interfaces/api/UseApiOptions";

export const useApi = <T = any, E = any>(
  config: AxiosRequestConfig,
  options: UseApiOptions<T> = {}
) => {
  const { manual = false, initialData = null, isAuthRequest = false } = options;
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState<AxiosError<E> | null>(null);

  // Selectively memoizing only necessary fields from config
  const memoizedConfig = useMemo(
    () => ({
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: JSON.stringify(config.data),
    }),
    [config.url, config.method, config.headers, config.data]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (isAuthRequest) {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      }

      const response = await axios<T>(memoizedConfig);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError<E>);
    } finally {
      setLoading(false);
    }
  }, [memoizedConfig, isAuthRequest]);

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, loading, error, fetchData };
};
