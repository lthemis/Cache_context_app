import { useState, useCallback } from 'react';

const useGetRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send get request and use body of successful response as an argument of passed "applyData" function.
  const sendGetRequest = useCallback(
    async (applyData: applyData, requestConfig?: requestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch using hardcoded or optionally passed requestConfig object.
        const response = await fetch(
          requestConfig?.url
            ? requestConfig.url
            : `http://localhost:8000/getTasks`,
          {
            method: 'GET',
            mode: 'cors',
            headers: requestConfig?.headers
              ? requestConfig.headers
              : { 'Content-Type': 'application/json' },
            body: requestConfig?.body
              ? JSON.stringify(requestConfig.body)
              : null,
          }
        );
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
    sendGetRequest,
  };
};

export default useGetRequest;
