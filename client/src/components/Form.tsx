import React, { useState } from 'react'

export const Form = () => {
  const [task, setTask] = useState({})

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    setTask({ ...task, [name]: target.value })
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(task);

  }
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="dueDate">Due data</label>
      <input onChange={handleInputChange} type="date" name="dueDate" />
      <label htmlFor="task">Add a task</label>
      <input onChange={handleInputChange} type="text" name="task" />
      <button type="submit">Submit</button>
    </form>
  )
}