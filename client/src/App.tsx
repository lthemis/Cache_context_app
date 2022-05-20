import React, { useReducer, useState } from 'react';
import './App.css';
import { TasksContext } from './context/TasksContext';
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

  const [tasks, setTasks] = useState<Task[] | []>([]);

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
