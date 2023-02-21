import React, { useEffect, useState } from 'react';
import { apiClient } from '@config';

export const useAPI = (
  URL,
  config = {},
  initialValues = {},
) => {
  const [data, setData] = useState(initialValues.data);
  const [loading, setLoading] = useState(initialValues.loading);
  const [error, setError] = useState(initialValues.error);

  // Default configration
  const { method = 'GET', fetchOnInit = true } = config;

  const fetchData = ({
    data,
    params,
    headers,
    url = URL,
  } = {}) => new Promise(
    (resolve, reject) => {
      setLoading(true);
      apiClient({
        method,
        url,
        data,
        params,
        headers,
      }).then(response => {
        if (response.data) {
          setData(response.data);
          setError(null)
          resolve(response.data);
        }
      }).catch(err => {
        if (err?.message) {
          setError(err?.message);
          setData(initialValues.data);
          reject(err?.message);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  );

  useEffect(() => {
    // If method is 'GET' then fetch the data on mount
    if (fetchOnInit !== false && method === 'GET') {
      fetchData();
    }
  }, []);

  return [{ data, loading, error }, fetchData];
};
