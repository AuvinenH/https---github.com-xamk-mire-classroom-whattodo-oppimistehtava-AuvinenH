export type TaskListModel = {
  tasks: Task[] | null;
};

export type Task = {
  _id?: string;
  name: string;
  content: string;
  startDate?: string | null;
  endDate?: string | null;
  status: TaskStatusEnum;
};

export enum TaskStatusEnum {
  new = "new",
  inprogress = "inprogress",
  done = "done",
}
