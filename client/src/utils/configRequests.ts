export const getRequestConfig: requestConfig = {
  url: `http://localhost:8000/getTasks`,
  method: 'GET',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
};

export const postRequestConfig: requestConfig = {
  url: `http://localhost:8000/addTask`,
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const patchRequestConfig: requestConfig = {
  url: `http://localhost:8000/editTask`,
  method: 'PATCH',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const deleteRequestConfig: requestConfig = {
  url: `http://localhost:8000/deleteTask`,
  method: 'DELETE',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};
