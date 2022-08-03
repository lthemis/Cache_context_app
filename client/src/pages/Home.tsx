import { Form } from '../components/Form';
import { TaskList } from '../components/TaskList';
import { useEffect, useState } from 'react';
import { TasksContext } from '../context/TasksContext';
import useGetRequest from '../hooks/useGetRequest';

export const Home = () => {
  const config = {
    url: `http://localhost:8000/addTask`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { sendGetRequest } = useGetRequest();

  const [allTasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    // Send get request and populate all tasks state with return value
    sendGetRequest(setTasks);
  }, [sendGetRequest, allTasks]);

  const appContext = {
    allTasks: allTasks,
    setTasks: setTasks,
  };

  return (
    <div>
      <TasksContext.Provider value={appContext}>
        <Form {...config}></Form>
        <TaskList></TaskList>
      </TasksContext.Provider>
    </div>
  );
};
