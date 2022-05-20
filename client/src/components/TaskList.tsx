import React, { useContext } from 'react';
import { Task } from './Task';
import { TasksContext } from '../context/TasksContext';

export const TaskList = () => {
  const { tasks, action, dispatch } = useContext(TasksContext);
  return (
    <div>
      TaskList
      {tasks &&
        tasks.map((task) => {
          // return <p>{task.content}</p>;
          return <Task {...task}></Task>;
        })}
    </div>
  );
};
