import React, { useContext, useState } from 'react';
import { SingleTaskContext, TasksContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';
import { Modal } from './Modal';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    <Box
      component="section"
      sx={{ p: 2, border: '1px dashed grey', width: 1 / 2 }}
    >
      <Typography paragraph={true}>{task.content}</Typography>
      <Typography paragraph={true}>
        Created at:{' '}
        {task.createdAt && dayjs(task.createdAt).format('YYYY-MM-DD')}
      </Typography>
      {task.dueDate ? (
        <Typography paragraph={true}>
          Due date: {task.dueDate.toString()}
        </Typography>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{ m: 1, width: 1 / 3 }}
          variant="contained"
          type="button"
          onClick={editHandler}
        >
          Edit
        </Button>
        <Button
          sx={{ m: 1, width: 1 / 3 }}
          variant="contained"
          type="button"
          name="delete"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </Box>
      {editState ? (
        <SingleTaskContext.Provider value={singleTaskContext}>
          <Modal />{' '}
        </SingleTaskContext.Provider>
      ) : null}
    </Box>
  );
};
