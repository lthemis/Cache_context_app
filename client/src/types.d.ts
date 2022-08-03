interface Task {
  _id?: string;
  content?: string;
  dueDate?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface Context {
  allTasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface SingleTaskContext {
  singleTask: Task;
  setEditModalState?: React.Dispatch<React.SetStateAction>;
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
interface applyData {
  (data): void;
}

interface error {
  name: string;
  message: string;
}
