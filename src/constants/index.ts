export const APP_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  COURSES: "/courses",
  COURSE_DETAIL: "/courses/:id",
  SCHEDULE: "/schedule",
  STUDENTS: "/students",
  PROFILE: "/profile",
  ADMIN: {
    DASH: "/admin/dashboard",
    COURSES: "/admin/courses",
    USERS: "/admin/users",
    CATEGORIES: "/admin/categories",
  },
};

export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
export const MOODLE_BASE_URL = import.meta.env.VITE_MOODLE_BASE_URL || "";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh-token",
    ME: "/auth/me",
  },
  COURSES: {
    BASE: "/courses",
    DETAIL: (id: number) => `/courses/${id}`,
    ENROLL: (id: number) => `/courses/${id}/enroll`,
    STUDENTS: (id: number) => `/courses/${id}/students`,
  },
  MODULES: {
    BY_COURSE: (courseId: number) => `/courses/${courseId}/modules`,
    DETAIL: (id: number) => `/modules/${id}`,
  },
  CATEGORIES: {
    BASE: "/categories",
  },
  DASHBOARD: {
    MY_COURSES: "/my-courses",
    SCHEDULE: "/schedule",
  },
};