import React, { useReducer, useState } from 'react';
import './App.css';
import { TasksContext } from './context/TasksContext';
import { Home } from './pages/Home';

// function reducer(state: Task[], action: Action): Task[] {
//   switch (action.type) {
//     case 'add':
//       console.log('add')
//       return [{ _id: "", content: "" }]
//     case 'delete':
//       console.log('Delete')
//       return [{ _id: "", content: "" }]
//     case 'edit':
//       console.log('edit');
//       return [{ _id: "", content: "" }]
//     default:
//       console.log('default');
//       return [{ _id: "", content: "" }]
//   }
// }

// const TasksContext = React.createContext<Task[]>([])

function App() {
  // const [state, dispatch] = useReducer(reducer, [{ _id: "", content: "" }])

  const [test, setTest] = useState<Task[]>([{ _id: '1s', content: 'test' }]);

  const appContext = {
    tasks: test,
    action: setTest,
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
