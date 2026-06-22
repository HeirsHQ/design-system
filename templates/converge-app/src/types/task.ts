import { User } from "./user";

export type TaskStatus = "blocked" | "completed" | "in-progress" | "overdue" | "to-do";
export type TaskPriority = "high" | "low" | "medium";

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  people: User[];
  category: string;
  deadline: Date;
  status: TaskStatus;
  createdAt: Date;
  description?: string;
}

export interface CreateTaskDto {
  title: string;
  assignees: string[];
  category: string;
  priority: TaskPriority | (string & {});
  status: TaskStatus | (string & {});
  deadline: Date | undefined;
  description?: string;
}
