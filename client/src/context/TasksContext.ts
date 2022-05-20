import React from 'react';

export const TasksContext = React.createContext<Context>({ tasks: [] });
export const SingleTaskContext = React.createContext<SingleTaskContext>({
  singleTask: {},
});
