import React, { useContext } from 'react';
import { Task } from './Task';
import { AllTasksContext } from '../context/TasksContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TaskList = () => {
  const { allTasks } = useContext(AllTasksContext);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ m: 1 }}></Typography>
      {allTasks &&
        allTasks.map((task) => {
          return <Task key={task._id} {...task}></Task>;
        })}
    </Box>
  );
};
