
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { fetchAssignments } from "./assignments/assignment.slice";
import AssignmentForm from "./assignments/components/AssignmentForm";
import AssignmentList from "./assignments/components/AssignmentList";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">STUDENT WORKSPACE</p>
          <h1>Student Deadline Tracker</h1>
          <p>Theo dõi bài tập, làm chủ thời hạn.</p>
        </div>
      </header>

      <div className="dashboard">
        <AssignmentForm />

        <AssignmentList>
          <AssignmentList.Header />
          <AssignmentList.Filter />
          <AssignmentList.Items />
        </AssignmentList>
      </div>
    </main>
  );
}

export default App;
