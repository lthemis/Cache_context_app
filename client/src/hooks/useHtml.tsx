import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig: requestConfig, applyData: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          mode: 'cors',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          const err = await response.json();
          console.log(err);

          throw new Error('Request failed!');
        }

        const data = await response.json();
        applyData(data);
      } catch (err: any) {
        console.log(err);

        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
