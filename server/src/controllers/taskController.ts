import { Request, Response } from 'express';
import { Task } from '../models/Task';

export async function addTask(req: Request, res: Response) {
  console.log('controller');

  try {
    console.log(req.body.task);
    const task = req.body.task;
    const taskFromDb = await Task.create(task);
    console.log('created');

    res.status(200);
    res.send(taskFromDb);
    res.end();
  } catch (e) {
    res.status(500);
    res.send(e);
    res.end();
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const tasksFromDb = await Task.find({});
    res.status(200);
    res.send(tasksFromDb);
    res.end();
  } catch (e) {
    res.status(500);
    res.send(e);
    res.end();
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const task = req.body.task;
    const taskFromDb = await Task.deleteOne({ _id: task._id });
    res.status(200);
    res.send(taskFromDb);
    res.end();
  } catch (e) {
    res.status(500);
    res.send(e);
    res.end();
  }
}

export async function editTask(req: Request, res: Response) {
  try {
    const task = req.body.task;
    const acknowledgement = await Task.findOneAndUpdate(
      { _id: task._id },
      { content: task.content, dueDate: task.dueDate },
      { new: true }
    );
    res.status(200);
    res.send(acknowledgement);
    res.end();
  } catch (e) {
    res.status(500);
    res.send(e);
    res.end();
  }
}
