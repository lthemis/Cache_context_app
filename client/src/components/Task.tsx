import React, { useContext, useState } from 'react';
import { TasksContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';
import { Modal } from './Modal';

export const Task = ({ _id, dueDate, content }: Task) => {
  const { tasks, action, dispatch, setTasks } = useContext(TasksContext);
  const [editState, setEditState] = useState(false);

  const { sendRequest: deleteTask } = useHttp();

  function editHandler() {
    setEditState(true);
  }

  function deleteHandler() {
    const config = {
      url: `http://localhost:8000/deleteTask`,
      body: { task: { _id: _id } },
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
              ...prev.filter((task) => task._id !== _id),
            ]);
        }
      }
    );
  }
  return (
    <div>
      <p>{content}</p>
      {dueDate ? <p>{dueDate.toString()}</p> : null}
      <button type="button" onClick={editHandler}>
        Edit
      </button>
      <button type="button" name="delete" onClick={deleteHandler}>
        Delete
      </button>
      {editState ? <Modal {...{ _id, dueDate, content }} /> : null}
    </div>
  );
};
