import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { TasksContext } from './context/TasksContext';
import useHttp from './hooks/useHtml';
import { Home } from './pages/Home';
// function reducer(state: Task[], action: Action): Task[] {
//   switch (action.type) {
//     case 'add':
//       console.log('add');
//       console.log(action.payload);
//       return [...state, action.payload];
//     case 'delete':
//       console.log('Delete');
//       return [{ _id: '', content: '' }];
//     case 'edit':
//       console.log('edit');
//       return [{ _id: '', content: '' }];
//     default:
//       console.log('default');
//       return [{ _id: '', content: '' }];
//   }
// }

// const TasksContext = React.createContext<Task[]>([])

function App() {
  // const [state, dispatch] = useReducer(reducer, [{ _id: '', content: '' }]);
  const { sendRequest } = useHttp();
  const [tasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    const config = {
      url: `http://localhost:8000/getTasks`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    sendRequest(config, setTasks);
  }, [sendRequest]);

  const appContext = {
    tasks: tasks,
    setTasks: setTasks,
    // tasks: state,
    // action: setTest,
    // dispatch: dispatch,
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
