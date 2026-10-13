
import { useMemo } from "react";

export function useCountdown(deadline: string) {
  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(`${deadline}T00:00:00`);

    if (Number.isNaN(dueDate.getTime())) {
      return {
        days: 0,
        isOverdue: false,
        label: "Ngày không hợp lệ",
      };
    }

    const diff = Math.round(
      (dueDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      return {
        days: Math.abs(diff),
        isOverdue: true,
        label: `Quá hạn ${Math.abs(diff)} ngày`,
      };
    }

    return {
      days: diff,
      isOverdue: false,
      label: `Còn ${diff} ngày`,
    };
  }, [deadline]);
}
