import React, { useContext, useState } from 'react';
import { SingleTaskContext, TasksContext } from '../context/TasksContext';
import { Modal } from './Modal';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useHttpRequest from '../hooks/useHttp';
import { deleteRequestConfig } from '../utils/configRequests';

export const Task = ({ ...task }: Task) => {
  const { setTasks } = useContext(TasksContext);
  const [editState, setEditModalState] = useState(false);
  const singleTaskContext = {
    singleTask: task,
    setEditModalState: setEditModalState,
  };

  const { sendRequest: deleteTaskHttpRequest } = useHttpRequest();

  function editHandler() {
    setEditModalState(true);
  }

  function deleteHandler() {
    // deleteTaskHttpRequest is a function accepting two arguments, 1: callback to be applied on HTTP response and 2: config for the HTTP request.
    deleteTaskHttpRequest(
      (data: { acknowledged: boolean; deletedCount: number }) => {
        // If backend confirms deletion from the database, remove from state
        if (data.deletedCount === 1) {
          setTasks &&
            setTasks((prev: Task[]) => [
              ...prev.filter((t) => t._id !== task._id),
            ]);
        }
      },
      {
        ...deleteRequestConfig,
        body: { task: { _id: task._id } },
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
