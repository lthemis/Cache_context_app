import Mongoose from 'mongoose';

export interface Task {
  _id: string;
  content: string;
  dueDate?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const taskSchema = new Mongoose.Schema<Task>(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
    dueDate: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Task = Mongoose.model<Task>('Task', taskSchema);
