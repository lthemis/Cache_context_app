interface Task {
  _id?: string;
  content?: string;
  dueDate?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface MultipleTasksContext {
  allTasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface SingleTaskContext {
  singleTask: Task;
  setEditModalState?: React.Dispatch<React.SetStateAction>;
}

interface requestConfig<T = void> {
  url: string;
  method: string;
  mode: RequestMode;
  headers: {
    'Content-Type': string;
  };
  body?: T;
}
interface applyData {
  (data): void;
}
