import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import courseService from "../services/CourseService";
import type { BaseUserDto } from "../types/UserType";

interface StudentState {
  students: BaseUserDto[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

export const fetchCourseStudents = createAsyncThunk(
  "students/fetchCourseStudents",
  async (courseId: number) => {
    const response = await courseService.getCourseStudents(courseId);
    return response;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearStudents: (state) => {
      state.students = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCourseStudents.rejected, (state, action) => {
        state.loading = false;
        state.students = [];
        state.error = action.error.message || "Failed to fetch students";
      });
  },
});

export const { clearStudents } = studentSlice.actions;
export default studentSlice.reducer;
