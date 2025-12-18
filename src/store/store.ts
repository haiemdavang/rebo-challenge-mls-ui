import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import courseReducer from "./courseSlice";
import dashboardReducer from "./dashboardSlice";
import moduleReducer from "./moduleSlice";
import studentReducer from "./studentSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    courses: courseReducer,
    modules: moduleReducer,
    students: studentReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;