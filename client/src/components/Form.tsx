import React, { useState, useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';

export const Form = (config: requestConfig) => {
  const { tasks, action, dispatch, setTasks } = useContext(TasksContext);
  const [task, setTask] = useState({});
  const { sendRequest } = useHttp();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    setTask({ ...task, [name]: target.value });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // dispatch && dispatch({ type: 'add', payload: task });
    // action && action([{ _id: '2s', content: 'upward mobility2' }]);

    // const config = {
    //   url: `http://localhost:8000/addTask`,
    //   body: { task: task },
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    config = {
      ...config,
      body: { task: task },
    };
    sendRequest(
      config,
      (data: Task) => setTasks && setTasks((prev) => [...prev, data])
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="dueDate">Due data</label>
      <input onChange={handleInputChange} type="date" name="dueDate" />
      <label htmlFor="content">Add a task</label>
      <input onChange={handleInputChange} type="text" name="content" />
      <button type="submit">Submit</button>
    </form>
  );
};
