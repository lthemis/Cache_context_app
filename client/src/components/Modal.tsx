import { Form } from './Form';
import { patchRequestConfig } from '../utils/configRequests';

export const Modal = () => {
  return (
    <div
      style={{
        backgroundColor: 'grey',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        zIndex: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form {...patchRequestConfig}></Form>
    </div>
  );
};
