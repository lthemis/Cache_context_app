import express from 'express';
import { addTask, deleteTask, editTask } from '../controllers/taskController';
const taskRouter = express.Router();

taskRouter.post('/addTask', addTask);
taskRouter.get('/getTasks', addTask);
taskRouter.delete('/deleteTask', deleteTask);
taskRouter.patch('/editTask', editTask);

export default taskRouter;
