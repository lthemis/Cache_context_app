import React, { useState, useContext } from 'react';
import { TasksContext, SingleTaskContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';
import { checkIfObjectIsPopulated } from '../utils/helperFunctions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const Form = (config: requestConfig) => {
  const { singleTask, setEditModalState } = useContext(SingleTaskContext);
  const { allTasks, setTasks } = useContext(TasksContext);
  const [task, setTask] = useState<Task>(
    checkIfObjectIsPopulated(singleTask)
      ? singleTask
      : { dueDate: '', content: '' }
  );
  const [shouldDisableBtn, setShouldDisableBtn] = useState(true);
  const { sendRequest } = useHttp();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;

    validateBtn(target.name, target.value);

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
    setEditModalState && setEditModalState(false);
    setTask({ dueDate: '', content: '' });
    setShouldDisableBtn(true);

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

  function validateBtn(name: string, value: string) {
    name === 'content' && value === ''
      ? setShouldDisableBtn(true)
      : setShouldDisableBtn(false);

    name === 'content' &&
      allTasks.some((t) => {
        return t.content === value;
      })
      ? setShouldDisableBtn(true)
      : setShouldDisableBtn(false);
  }

  return (
    <Stack
      component="form"
      noValidate
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        zIndex: '1000',
        backgroundColor: 'white',
      }}
      spacing={2}
      onSubmit={submitHandler}
    >
      <TextField
        id="date"
        label="Due date:"
        type="date"
        name="dueDate"
        onChange={handleInputChange}
        value={task.dueDate}
        InputLabelProps={{
          shrink: true,
        }}
      ></TextField>
      <TextField
        label="Task:"
        type="text"
        name="content"
        onChange={handleInputChange}
        value={task.content}
      ></TextField>

      <Button
        variant="contained"
        type="submit"
        disabled={shouldDisableBtn}
        sx={{ width: 1 / 8, alignSelf: 'center' }}
      >
        Submit
      </Button>
    </Stack>
  );
};
