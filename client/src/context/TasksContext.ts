import React from 'react';

export const TasksContext = React.createContext<Context>({ allTasks: [] });
export const SingleTaskContext = React.createContext<SingleTaskContext>({
  singleTask: {},
});
