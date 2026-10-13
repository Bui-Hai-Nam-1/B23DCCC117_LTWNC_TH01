
import { configureStore } from "@reduxjs/toolkit";
import assignmentReducer from "../assignments/assignment.slice";

export const store = configureStore({
  reducer: {
    assignments: assignmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
