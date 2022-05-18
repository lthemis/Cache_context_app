import Mongoose from 'mongoose';

export interface Task {
  _id?: string;
  content: string;
  dateAddded: Date;
  dueDate: Date;
}

const taskSchema = new Mongoose.Schema<Task>({
  content: {
    type: String,
    required: true,
    unique: true,
  },
  dateAddded: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
  },
});

export const Task = Mongoose.model<Task>('Task', taskSchema);
