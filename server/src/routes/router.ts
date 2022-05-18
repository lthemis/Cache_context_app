import express from 'express';
import { addTask, deleteTask, editTask } from '../controllers/taskController';
const taskRouter = express.Router();

taskRouter.post('/addTask', addTask);
taskRouter.delete('/deleteTask', deleteTask);
taskRouter.patch('/editTask', editTask);

export default taskRouter;
