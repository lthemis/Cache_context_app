import { Request, Response } from 'express';
import { Task } from '../models/Task';

export async function addTask(req: Request, res: Response) {
  try {
    const task = req.body.task;
    const taskFromDb = await Task.create(task);
    res.status(200);
    res.send(taskFromDb);
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
    const taskFromDb = await Task.findOneAndUpdate(
      { _id: task._id },
      { new: true }
    );
    res.status(200);
    res.send(taskFromDb);
    res.end();
  } catch (e) {
    res.status(500);
    res.send(e);
    res.end();
  }
}
