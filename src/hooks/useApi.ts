import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { UseApiOptions } from "../interfaces/api/UseApiOptions";

export const useApi = <T = any, E = any>(
  config: AxiosRequestConfig,
  options: UseApiOptions<T> = {}
) => {
  const { manual = false, initialData = null } = options;
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState<AxiosError<E> | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      const response = await axios<T>(config);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError<E>);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [config.url, fetchData, manual]);

  return { data, loading, error, fetchData };
};
