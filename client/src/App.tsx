import React, { useEffect, useState } from 'react';
import './App.css';
import { TasksContext } from './context/TasksContext';
import useGetRequest from './hooks/useGetRequest';
import { Home } from './pages/Home';

function App() {
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
    <div className="App">
      <TasksContext.Provider value={appContext}>
        <Home></Home>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
