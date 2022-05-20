import React from 'react';

export const Task = ({ dueDate, content }: Task) => {
  return (
    <div>
      <p>{content}</p>
      {dueDate ? <p>{dueDate.toString()}</p> : null}
    </div>
  );
};
