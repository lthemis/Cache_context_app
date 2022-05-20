import React from 'react';
import { Form } from './Form';
export const Modal = ({ ...task }: Task) => {
  const config = {
    url: `http://localhost:8000/editTask`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(config, task);

  return (
    <div
      style={{
        backgroundColor: 'grey',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        zIndex: '1000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form {...config}></Form>
    </div>
  );
};
