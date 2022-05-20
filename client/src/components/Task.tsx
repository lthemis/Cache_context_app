import React, { useContext, useState } from 'react';
import { SingleTaskContext, TasksContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';
import { Modal } from './Modal';
import dayjs from 'dayjs';

export const Task = ({ ...task }: Task) => {
  const { setTasks } = useContext(TasksContext);
  const [editState, setEditModalState] = useState(false);
  const singleTaskContext = {
    singleTask: task,
    setEditModalState: setEditModalState,
  };

  const { sendRequest: deleteTask } = useHttp();

  function editHandler() {
    setEditModalState(true);
  }

  function deleteHandler() {
    const config = {
      url: `http://localhost:8000/deleteTask`,
      body: { task: { _id: task._id } },
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    deleteTask(
      config,
      (data: { acknowledged: boolean; deletedCount: number }) => {
        if (data.deletedCount === 1) {
          setTasks &&
            setTasks((prev: Task[]) => [
              ...prev.filter((task) => task._id !== task._id),
            ]);
        }
      }
    );
  }

  return (
    <div>
      <p>{task.content}</p>
      <p>
        Created at:{' '}
        {task.createdAt && dayjs(task.createdAt).format('YYYY-MM-DD')}
      </p>
      {task.dueDate ? <p>{task.dueDate.toString()}</p> : null}
      <button type="button" onClick={editHandler}>
        Edit
      </button>
      <button type="button" name="delete" onClick={deleteHandler}>
        Delete
      </button>
      {editState ? (
        <SingleTaskContext.Provider value={singleTaskContext}>
          <Modal />{' '}
        </SingleTaskContext.Provider>
      ) : null}
    </div>
  );
};
