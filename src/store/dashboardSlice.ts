import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/DashboardService";
import type { CourseDto } from "../types/CourseType";

interface DashboardState {
  courses: CourseDto[];
  schedule: {
    week_start: string;
    week_end: string;
    courses: CourseDto[];
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  courses: [],
  schedule: null,
  loading: false,
  error: null,
};

export const fetchMyCourses = createAsyncThunk(
  "dashboard/fetchMyCourses",
  async (params?: { status?: "inprogress" | "finished" | "upcoming" }) => {
    const response = await dashboardService.getMyCourses(params);
    return response.data;
  }
);

export const fetchSchedule = createAsyncThunk("dashboard/fetchSchedule", async () => {
  const response = await dashboardService.getSchedule();
  return response;
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.schedule = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
