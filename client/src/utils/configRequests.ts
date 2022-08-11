const baseUrl =
  process.env.REACT_APP_BASE_URL !== undefined
    ? process.env.REACT_APP_BASE_URL
    : 'http://localhost:8000';

export const getRequestConfig: requestConfig = {
  url: `${baseUrl}/getTasks`,
  method: 'GET',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
};

export const postRequestConfig: requestConfig<{ task: Task }> = {
  url: `${baseUrl}/addTask`,
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const patchRequestConfig: requestConfig<{ task: Task }> = {
  url: `${baseUrl}/editTask`,
  method: 'PATCH',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const deleteRequestConfig: requestConfig<{ task: Task }> = {
  url: `${baseUrl}/deleteTask`,
  method: 'DELETE',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};
