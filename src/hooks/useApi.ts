import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { UseApiOptions } from "../interfaces/api/UseApiOptions";

export const useApi = (
  config: AxiosRequestConfig,
  options: UseApiOptions = {}
) => {
  const { manual = false, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      const response = await axios(config);

      setData(response.data);
    } catch (err) {
      setError(err);
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
