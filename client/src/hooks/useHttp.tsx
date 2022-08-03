import { useState, useCallback } from 'react';

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send get request and use body of successful response as an argument of passed "applyData" function.
  const sendRequest = useCallback(
    async (applyData: applyData, requestConfig: requestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch using hardcoded or optionally passed requestConfig object.
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method,
          mode: requestConfig.mode,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body),
        });
        // throw server side error
        if (!response.ok) {
          throw new Error('Request failed!');
        }
        // Pass response as an argument
        const data = await response.json();
        applyData(data);
      } catch (err: unknown) {
        let message = 'Unknown error';
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
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

export default useHttpRequest;
