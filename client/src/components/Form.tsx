import React, { useState, useContext } from 'react';
import { AllTasksContext, SingleTaskContext } from '../context/TasksContext';
import { checkIfObjectIsPopulated } from '../utils/helperFunctions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import useHttpRequest from '../hooks/useHttp';

export const Form = (requestConfig: requestConfig<{ task: Task }>) => {
  // Single task context used in during editing a task to manage modal status and keep information about selected task.
  const { singleTask, setEditModalState } = useContext(SingleTaskContext);
  // All tasks context - repository of all tasks.
  const { allTasks, setTasks } = useContext(AllTasksContext);
  // Task state - default empty or edited task if in edit mode.
  const [task, setTask] = useState<Task>(
    checkIfObjectIsPopulated(singleTask)
      ? singleTask
      : { dueDate: '', content: '' }
  );
  // Submit button should be disabled if task provided by the user is empty or duplicate.
  const [shouldDisableBtn, setShouldDisableBtn] = useState(true);
  // Custom hook for http requests.
  const { sendRequest: postPatchTaskHttpRequest } = useHttpRequest();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;

    // decide if submit button should be disabled
    manageBtnStatus(target.name, target.value);

    setTask({ ...task, [name]: target.value });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // If object is populated, we are editing an existing task
    if (checkIfObjectIsPopulated(singleTask)) {
      requestConfig = {
        ...requestConfig,
        body: {
          task: { ...singleTask, content: task.content, dueDate: task.dueDate },
        },
      };
      // Else add a new task.
    } else {
      requestConfig = {
        ...requestConfig,
        body: {
          task: task,
        },
      };
    }

    // Hide modal if displayed, clear input form and disable button.
    setEditModalState && setEditModalState(false);
    setTask({ dueDate: '', content: '' });
    setShouldDisableBtn(true);

    postPatchTaskHttpRequest(
      (data: Task) =>
        setTasks &&
        setTasks((prev) => {
          return checkIfObjectIsPopulated(singleTask)
            ? [...prev.filter((t) => t._id !== singleTask._id), data]
            : [...prev, data];
        }),
      requestConfig
    );
  }

  function manageBtnStatus(name: string, value: string) {
    // If value (task) is not provided by the user, disable submit button.
    name === 'content' && value === ''
      ? setShouldDisableBtn(true)
      : setShouldDisableBtn(false);

    name === 'content' &&
      // If value (task) provided by the user is a duplicate, disable submit button.
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
