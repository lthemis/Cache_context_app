import React from 'react';
import { Form } from '../components/Form';
import { TaskList } from '../components/TaskList';

export const Home = () => {
  const config = {
    url: `http://localhost:8000/addTask`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (
    <div>
      <Form {...config}></Form>
      <TaskList></TaskList>
    </div>
  );
};
