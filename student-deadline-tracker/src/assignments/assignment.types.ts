
export type Priority = "low" | "medium" | "high";

export type AssignmentStatus = "pending" | "completed";

export type AssignmentFilterType =
  | "all"
  | "pending"
  | "overdue"
  | "completed";

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  deadline: string;
  priority: Priority;
  status: AssignmentStatus;
}

export type CreateAssignmentDTO = Pick<
  Assignment,
  "subject" | "title" | "deadline" | "priority"
>;

export type UpdateAssignmentDTO = Partial<
  Omit<Assignment, "id">
>;

export interface ApiResponse<T> {
  data: T;
  message: string;
}
