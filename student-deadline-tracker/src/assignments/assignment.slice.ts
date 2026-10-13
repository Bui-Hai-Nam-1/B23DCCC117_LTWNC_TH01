
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  Assignment,
  CreateAssignmentDTO,
} from "./assignment.types";

import { fetchAssignmentsAPI } from "./assignment.api";

interface AssignmentState {
  items: Assignment[];
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAll",
  async () => {
    const response = await fetchAssignmentsAPI();
    return response.data;
  }
);

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<CreateAssignmentDTO>
    ) => {
      const newAssignment: Assignment = {
        ...action.payload,
        id: crypto.randomUUID(),
        status: "pending",
      };

      state.items.push(newAssignment);
    },

    toggleAssignment: (
      state,
      action: PayloadAction<string>
    ) => {
      const assignment = state.items.find(
        (item) => item.id === action.payload
      );

      if (assignment) {
        assignment.status =
          assignment.status === "completed"
            ? "pending"
            : "completed";
      }
    },

    deleteAssignment: (
      state,
      action: PayloadAction<string>
    ) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Không thể tải dữ liệu";
      });
  },
});

export const {
  addAssignment,
  toggleAssignment,
  deleteAssignment,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
