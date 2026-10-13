
import type { Assignment, ApiResponse } from "./assignment.types";

const mockAssignments: Assignment[] = [
  {
    id: "1",
    subject: "Lập trình Web",
    title: "Xây dựng giao diện React",
    deadline: "2026-10-20",
    priority: "high",
    status: "pending",
  },
  {
    id: "2",
    subject: "Cơ sở dữ liệu",
    title: "Thiết kế sơ đồ ERD",
    deadline: "2026-10-12",
    priority: "medium",
    status: "pending",
  },
  {
    id: "3",
    subject: "TypeScript",
    title: "Thực hành Generic",
    deadline: "2026-10-25",
    priority: "high",
    status: "completed",
  },
  {
    id: "4",
    subject: "Cấu trúc dữ liệu",
    title: "Bài tập cây nhị phân",
    deadline: "2026-10-10",
    priority: "low",
    status: "pending",
  },
];

export async function fetchAssignmentsAPI():
  Promise<ApiResponse<Assignment[]>> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: mockAssignments,
    message: "Lấy danh sách bài tập thành công",
  };
}
