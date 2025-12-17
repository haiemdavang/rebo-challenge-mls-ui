import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import courseService from "../services/CourseService";
import type {
    CourseDto,
    CourseFilterParams,
    CreateCourseRequest,
    UpdateCourseRequest
} from "../types/CourseType";

interface CourseState {
  courses: CourseDto[];
  currentCourse: CourseDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (params?: CourseFilterParams) => {
    const response = await courseService.getCourses(params);
    return response.data;
  }
);

export const fetchCourseDetail = createAsyncThunk(
  "courses/fetchCourseDetail",
  async (id: number) => {
    const response = await courseService.getCourseDetail(id);
    return response;
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (data: CreateCourseRequest) => {
    const response = await courseService.createCourse(data);
    return response;
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, data }: { id: number; data: UpdateCourseRequest }) => {
    const response = await courseService.updateCourse(id, data);
    return response;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.currentCourse = action.payload;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.currentCourse?.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
      });
  },
});

export default courseSlice.reducer;
