export type ListItem = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  isCompleted: boolean;
  completedDate: string;
};

export type TaskRequest = {
  name: string;
  description: string;
};
