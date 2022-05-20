import React, { useState, useContext, useEffect, useCallback } from 'react';
import { TasksContext, SingleTaskContext } from '../context/TasksContext';
import useHttp from '../hooks/useHtml';
import { checkIfObjectIsPopulated } from '../utils/helperFunctions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const Form = (config: requestConfig) => {
  const { singleTask, setEditModalState } = useContext(SingleTaskContext);
  const { tasks, setTasks } = useContext(TasksContext);
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

    setTask({ ...task, [name]: target.value });
    // validateBtn();
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
  const validateBtn = useCallback(() => {
    task.content && task.content.length === 0
      ? setShouldDisableBtn(true)
      : setShouldDisableBtn(false);

    tasks.some((t) =>
      t.content === task.content
        ? setShouldDisableBtn(true)
        : setShouldDisableBtn(false)
    );
  }, [task]);

  useEffect(() => {
    validateBtn();
  }, [validateBtn, task]);

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

      {shouldDisableBtn ? (
        <Button
          variant="contained"
          type="submit"
          disabled
          sx={{ width: 1 / 8, alignSelf: 'center' }}
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          type="submit"
          sx={{ width: 1 / 8, alignSelf: 'center' }}
        >
          Submit
        </Button>
      )}
    </Stack>
  );
};
