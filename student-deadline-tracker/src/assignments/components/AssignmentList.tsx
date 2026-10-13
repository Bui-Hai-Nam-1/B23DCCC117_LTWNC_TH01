
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { AssignmentFilterType } from "../assignment.types";
import { useAppSelector } from "../../app/hooks";
import {
  selectFilteredAssignments,
  selectAssignmentStats,
  selectLoading,
  selectError,
} from "../assignment.selectors";
import AssignmentItem from "./AssignmentItem";

interface ListContextValue {
  filter: AssignmentFilterType;
  setFilter: (filter: AssignmentFilterType) => void;
}

const ListContext = createContext<ListContextValue | null>(null);

function useListContext() {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error(
      "AssignmentList components phải nằm bên trong AssignmentList"
    );
  }

  return context;
}

function Header() {
  const stats = useAppSelector(selectAssignmentStats);

  return (
    <div className="list-header">
      <div>
        <h2>Danh sách bài tập</h2>
        <p>{stats.total} bài tập tất cả</p>
      </div>

      <div className="stats">
        <span>Chưa xong: {stats.pending}</span>
        <span>Hoàn thành: {stats.completed}</span>
      </div>
    </div>
  );
}

function Filter() {
  const { filter, setFilter } = useListContext();

  const filters: { value: AssignmentFilterType; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "pending", label: "Chưa hoàn thành" },
    { value: "overdue", label: "Quá hạn" },
    { value: "completed", label: "Đã hoàn thành" },
  ];

  return (
    <div className="filter-list">
      {filters.map((item) => (
        <button
          key={item.value}
          className={filter === item.value ? "active" : ""}
          onClick={() => setFilter(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Items() {
  const { filter } = useListContext();

  const assignments = useAppSelector((state) =>
    selectFilteredAssignments(state, filter)
  );

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  if (loading) return <p>Đang tải bài tập...</p>;
  if (error) return <p className="error">{error}</p>;

  if (assignments.length === 0) {
    return <p className="empty">Không có bài tập nào.</p>;
  }

  return (
    <div className="assignment-list">
      {assignments.map((assignment) => (
        <AssignmentItem
          key={assignment.id}
          assignment={assignment}
        />
      ))}
    </div>
  );
}

interface AssignmentListProps {
  children: ReactNode;
}

function AssignmentListRoot({ children }: AssignmentListProps) {
  const [filter, setFilter] =
    useState<AssignmentFilterType>("all");

  return (
    <ListContext.Provider value={{ filter, setFilter }}>
      <section className="list-container">{children}</section>
    </ListContext.Provider>
  );
}

const AssignmentList = Object.assign(AssignmentListRoot, {
  Header,
  Filter,
  Items,
});

export default AssignmentList;
