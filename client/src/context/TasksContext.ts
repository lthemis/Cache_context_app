import React from 'react';

interface Task {
  _id: string;
  content: string;
  dueDate?: Date;
}

interface FuncProp {
  ():void;
}

interface Context {
  action?: React.Dispatch<React.SetStateAction<Task[]>>,
  tasks: Task[]
}

export const TasksContext = React.createContext<Context>({tasks:[]})
