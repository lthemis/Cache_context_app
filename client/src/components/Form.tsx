import React, { useState, useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';

export const Form = (config: requestConfig, taskToEdit: Task) => {
  // console.log(config, taskToEdit);

  const { tasks, action, dispatch, setTasks } = useContext(TasksContext);
  const [task, setTask] = useState<Task>({ content: '', dueDate: '' });
  const { sendRequest } = useHttp();
  // console.log(task);

  taskToEdit && Object.keys(taskToEdit).length > 0 ? setTask(taskToEdit) : null;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    setTask({ ...task, [name]: target.value });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(config);

    // if (taskToEdit && Object.keys(taskToEdit).length > 0) {
    //   config = {
    //     ...config,
    //     body: {
    //       task: {
    //         ...tasks.filter((t) => t._id === taskToEdit._id),
    //         content: task.content,
    //         dueData: task.dueDate,
    //       },
    //     },
    //   };
    // } else {
    //   config = {
    //     ...config,
    //     body: {
    //       task: task,
    //     },
    //   };
    // }

    // console.log('XXX', tasks, taskToEdit);

    // if (taskToEdit && Object.keys(taskToEdit).length > 0) {
    //   config = {
    //     ...config,
    //     body: {
    //       task: {
    //         ...tasks.filter((t) => t._id === taskToEdit._id),
    //         content: task.content,
    //         dueData: task.dueDate,
    //       },
    //     },
    //   };
    // } else {
    //   config = {
    //     ...config,
    //     body: {
    //       task: task,
    //     },
    //   };
    // }

    config = {
      ...config,
      body: {
        task: task,
      },
    };
    console.log(config);

    sendRequest(
      config,
      (data: Task) => setTasks && setTasks((prev) => [...prev, data])
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="dueDate">Due data</label>
      <input
        onChange={handleInputChange}
        type="date"
        name="dueDate"
      // value={task.dueDate?.toString()}
      />
      <label htmlFor="content">Add a task</label>
      <input
        onChange={handleInputChange}
        type="text"
        name="content"
      // value={task.content}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
