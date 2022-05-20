interface Task {
  _id: string;
  content: string;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface FuncProp {
  (): void;
}

interface Action {
  type: string;
  payload: Task;
}
interface Context {
  action?: React.Dispatch<React.SetStateAction<Task[]>>;
  dispatch?: React.Dispatch<any>;
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
}
