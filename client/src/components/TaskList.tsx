import React, { useContext } from 'react';
import { Task } from './Task';
import { TasksContext } from '../context/TasksContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TaskList = () => {
  const { tasks } = useContext(TasksContext);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ m: 1 }}>
        TaskList
      </Typography>
      {tasks &&
        tasks.map((task) => {
          return <Task key={task._id} {...task}></Task>;
        })}
    </Box>
  );
};
