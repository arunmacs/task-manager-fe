export interface ITask {
  _id?: string;
  userId: string;
  title: string;
  description?: string;
  status: "completed" | "pending";
  category: "work" | "personal" | "general";
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  displayPicture?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
}