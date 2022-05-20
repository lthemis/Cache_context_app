interface Task {
  _id: string;
  content: string;
  dueDate?: Date;
}

interface FuncProp {
  (): void;
}

interface Action {
  type: string;
}
