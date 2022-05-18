import React from 'react';

interface Task {
  _id: string;
  content: string;
  dueDate?: Date;
}

export const TasksContext = React.createContext<Task[]>([])
