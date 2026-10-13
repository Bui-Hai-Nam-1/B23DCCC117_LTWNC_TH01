
import { useState, type FormEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addAssignment } from "../assignment.slice";
import type { Priority } from "../assignment.types";

export default function AssignmentForm() {
  const dispatch = useAppDispatch();

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!subject.trim() || !title.trim() || !deadline) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(`${deadline}T00:00:00`);

    if (Number.isNaN(dueDate.getTime())) {
      setError("Ngày hạn nộp không hợp lệ.");
      return;
    }

    if (dueDate < today) {
      setError("Hạn nộp không được nằm trong quá khứ.");
      return;
    }

    dispatch(
      addAssignment({
        subject: subject.trim(),
        title: title.trim(),
        deadline,
        priority,
      })
    );

    setSubject("");
    setTitle("");
    setDeadline("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      <h2>Thêm bài tập mới</h2>

      <label htmlFor="subject">Môn học</label>
      <input
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Ví dụ: Lập trình Web"
        required
      />

      <label htmlFor="title">Tên bài tập</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập tên bài tập"
        required
      />

      <label htmlFor="deadline">Hạn nộp</label>
      <input
        id="deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />

      <label htmlFor="priority">Độ ưu tiên</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Thấp</option>
        <option value="medium">Trung bình</option>
        <option value="high">Cao</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit">Thêm bài tập</button>
    </form>
  );
}
