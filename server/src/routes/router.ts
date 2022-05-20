import express from 'express';
import {
  getTasks,
  addTask,
  deleteTask,
  editTask,
} from '../controllers/taskController';
const taskRouter = express.Router();

taskRouter.post('/addTask', addTask);
taskRouter.get('/getTasks', getTasks);
taskRouter.delete('/deleteTask', deleteTask);
taskRouter.patch('/editTask', editTask);

export default taskRouter;
