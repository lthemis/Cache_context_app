import React from 'react';

export const TasksContext = React.createContext<MultipleTasksContext>({
  allTasks: [],
});
export const SingleTaskContext = React.createContext<SingleTaskContext>({
  singleTask: {},
});
