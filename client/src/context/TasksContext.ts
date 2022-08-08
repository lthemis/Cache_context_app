import React from 'react';

export const AllTasksContext = React.createContext<AllTasksContext>({
  allTasks: [],
});
// Single task context used in during editing a task to manage modal status and keep information about selected task.
export const SingleTaskContext = React.createContext<SingleTaskContext>({
  singleTask: {},
});
