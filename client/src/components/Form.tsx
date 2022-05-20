import React, { useState, useContext } from 'react';
import { TasksContext, SingleTaskContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';
import { checkIfObjectIsPopulated } from '../utils/helperFunctions';

export const Form = (config: requestConfig) => {
  const { singleTask } = useContext(SingleTaskContext);
  const { setTasks } = useContext(TasksContext);
  const [task, setTask] = useState<Task>(
    checkIfObjectIsPopulated(singleTask)
      ? singleTask
      : { dueDate: '', content: '' }
  );
  const { sendRequest } = useHttp();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    setTask({ ...task, [name]: target.value });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (checkIfObjectIsPopulated(singleTask)) {
      config = {
        ...config,
        body: {
          task: { ...singleTask, content: task.content, dueDate: task.dueDate },
        },
      };
    } else {
      config = {
        ...config,
        body: {
          task: task,
        },
      };
    }

    sendRequest(
      config,
      (data: Task) =>
        setTasks &&
        setTasks((prev) => {
          return checkIfObjectIsPopulated(singleTask)
            ? [...prev.filter((t) => t._id !== singleTask._id), data]
            : [...prev, data];
        })
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="dueDate">Due data</label>
      <input
        onChange={handleInputChange}
        type="date"
        name="dueDate"
        value={task.dueDate?.toString()}
      />
      <label htmlFor="content">Add a task</label>
      <input
        onChange={handleInputChange}
        type="text"
        name="content"
        value={task.content}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
