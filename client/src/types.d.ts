interface Task {
  _id?: string;
  content?: string;
  dueDate?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface Action {
  type: string;
  payload: Task;
}
interface Context {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface SingleTaskContext {
  singleTask: Task;
}

interface requestConfig {
  url: string;
  method?: string;
  mode?: string;
  headers: {
    'Content-Type': string;
  };
  body?: any;
}
