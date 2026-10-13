
import type { RootState } from "../app/store";
import type { AssignmentFilterType } from "./assignment.types";

export const selectAssignments = (state: RootState) =>
  state.assignments.items;

export const selectLoading = (state: RootState) =>
  state.assignments.loading;

export const selectError = (state: RootState) =>
  state.assignments.error;

export const selectAssignmentStats = (state: RootState) => {
  const items = state.assignments.items;

  return {
    total: items.length,
    completed: items.filter(
      (item) => item.status === "completed"
    ).length,
    pending: items.filter(
      (item) => item.status === "pending"
    ).length,
  };
};

export const selectFilteredAssignments = (
  state: RootState,
  filter: AssignmentFilterType
) => {
  const items = state.assignments.items;

  if (filter === "completed") {
    return items.filter(
      (item) => item.status === "completed"
    );
  }

  if (filter === "pending") {
    return items.filter(
      (item) => item.status === "pending"
    );
  }

  if (filter === "overdue") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return items.filter((item) => {
      if (item.status === "completed") return false;

      const deadline = new Date(`${item.deadline}T00:00:00`);
      return deadline < today;
    });
  }

  return items;
};
