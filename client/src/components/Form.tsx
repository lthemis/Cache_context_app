import React, { useState, useContext } from 'react';
import { TasksContext } from '../context/TasksContext';

export const Form = () => {
  const { tasks, action } = useContext(TasksContext);
  const [task, setTask] = useState({});

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    setTask({ ...task, [name]: target.value });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(task);
    action!([{ _id: '2s', content: 'upward mobility2' }]);
    console.log(task);
  }

  console.log(tasks);

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="dueDate">Due data</label>
      <input onChange={handleInputChange} type="date" name="dueDate" />
      <label htmlFor="task">Add a task</label>
      <input onChange={handleInputChange} type="text" name="task" />
      <button type="submit">Submit</button>
    </form>
  );
};
