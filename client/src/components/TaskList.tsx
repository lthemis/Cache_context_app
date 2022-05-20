import React, { useContext } from 'react';
import { Task } from './Task';
import { TasksContext } from '../context/TasksContext';

export const TaskList = () => {
  const { tasks } = useContext(TasksContext);
  return (
    <div>
      TaskList
      {tasks &&
        tasks.map((task) => {
          return <Task key={task._id} {...task}></Task>;
        })}
    </div>
  );
};
