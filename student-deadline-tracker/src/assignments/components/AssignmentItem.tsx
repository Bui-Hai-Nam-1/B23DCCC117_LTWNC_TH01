
import type { Assignment } from "../assignment.types";
import { useCountdown } from "../../hooks/useCountdown";
import { useAppDispatch } from "../../app/hooks";
import {
  toggleAssignment,
  deleteAssignment,
} from "../assignment.slice";

interface Props {
  assignment: Assignment;
}

export default function AssignmentItem({ assignment }: Props) {
  const dispatch = useAppDispatch();
  const countdown = useCountdown(assignment.deadline);

  const priorityLabel = {
    low: "Thấp",
    medium: "Trung bình",
    high: "Cao",
  }[assignment.priority];

  return (
    <article className="assignment-card">
      <div className="assignment-main">
        <input
          type="checkbox"
          checked={assignment.status === "completed"}
          onChange={() => dispatch(toggleAssignment(assignment.id))}
          aria-label="Đánh dấu hoàn thành"
        />

        <div className="assignment-info">
          <h3
            className={
              assignment.status === "completed" ? "completed" : ""
            }
          >
            {assignment.title}
          </h3>

          <p>{assignment.subject}</p>

          <p>
            Hạn nộp:{" "}
            {new Date(
              `${assignment.deadline}T00:00:00`
            ).toLocaleDateString("vi-VN")}
          </p>

          <div className="assignment-meta">
            <span className={`priority ${assignment.priority}`}>
              Ưu tiên: {priorityLabel}
            </span>

            {assignment.status === "completed" ? (
              <span className="status completed-status">
                Đã hoàn thành
              </span>
            ) : (
              <span
                className={`status ${
                  countdown.isOverdue ? "overdue" : "upcoming"
                }`}
              >
                {countdown.label}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        className="delete-button"
        onClick={() => dispatch(deleteAssignment(assignment.id))}
      >
        Xóa
      </button>
    </article>
  );
}
