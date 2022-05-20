import React, { useEffect, useState } from 'react';
import './App.css';
import { TasksContext } from './context/TasksContext';
import useHttp from './hooks/useHtml';
import { Home } from './pages/Home';

function App() {
  const { sendRequest } = useHttp();
  const [allTasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    const config = {
      url: `http://localhost:8000/getTasks`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    sendRequest(config, setTasks);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }, [sendRequest, allTasks]);

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
