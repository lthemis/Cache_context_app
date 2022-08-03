import { Form } from '../components/Form';
import { TaskList } from '../components/TaskList';
import { useEffect, useState } from 'react';
import { TasksContext } from '../context/TasksContext';
import { getRequestConfig, postRequestConfig } from '../utils/configRequests';
import useHttpRequest from '../hooks/useHttp';

export const Home = () => {
  const { sendRequest: getTasksHttpRequest } = useHttpRequest();

  const [allTasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    // Send get request and populate all tasks state with return value
    getTasksHttpRequest(setTasks, getRequestConfig);
  }, [getTasksHttpRequest]);

  const appContext = {
    allTasks: allTasks,
    setTasks: setTasks,
  };

  // Pass configuration for HTTP request to be performed as props to the Form component.
  // Configuration differs (POST or PATCH) depending on parent component of the Form component.
  return (
    <div>
      <TasksContext.Provider value={appContext}>
        <Form {...postRequestConfig}></Form>
        <TaskList></TaskList>
      </TasksContext.Provider>
    </div>
  );
};
