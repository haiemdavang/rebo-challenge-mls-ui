import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moduleService from "../services/ModuleService";

interface ModuleState {
  modules: {
    course_info: {
      id: number;
      fullname: string;
      teacher: string;
    } | null;
    sections: Array<{
      title: string;
      modules: any[];
    }>;
  };
  modulesLoading: boolean;
  error: string | null;
}

const initialState: ModuleState = {
  modules: {
    course_info: null,
    sections: [],
  },
  modulesLoading: false,
  error: null,
};

export const fetchCourseModules = createAsyncThunk(
  "modules/fetchCourseModules",
  async (courseId: number) => {
    const response = await moduleService.getCourseModules(courseId);
    return response;
  }
);

const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseModules.pending, (state) => {
        state.modulesLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseModules.fulfilled, (state, action) => {
        state.modulesLoading = false;
        state.modules = action.payload;
      })
      .addCase(fetchCourseModules.rejected, (state, action) => {
        state.modulesLoading = false;
        state.error = action.error.message || "Failed to fetch modules";
      });
  },
});

export default moduleSlice.reducer;
