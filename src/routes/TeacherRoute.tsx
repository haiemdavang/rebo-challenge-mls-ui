import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { APP_ROUTES } from "../constants";
import { useAppSelector } from "../hooks/useAppRedux";
import DashboardLayout from "../layouts/DashboardLayout";
import CourseCreatePage from "../pages/teacher/CourseCreatePage";
import CourseEditPage from "../pages/teacher/CourseEditPage";
import CourseManagePage from "../pages/teacher/CourseManagePage";
import TeacherCoursesPage from "../pages/teacher/TeacherCoursesPage";

const TeacherRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(APP_ROUTES.LOGIN, { replace: true, state: { from: location } });
      return;
    }

    if (user?.role !== "teacher") {
      notifications.show({
        title: "Quyền truy cập bị từ chối",
        message: "Bạn không có quyền truy cập vào trang này.",
        color: "red",
      });
      navigate("/");
    }
  }, [isAuthenticated, user, navigate, location]);

  if (!isAuthenticated || user?.role !== "teacher") {
    return null;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
        <Route path="/teacher/courses/create" element={<CourseCreatePage />} />
        <Route path="/teacher/courses/:id/edit" element={<CourseEditPage />} />
        <Route
          path="/teacher/courses/:id/manage"
          element={<CourseManagePage />}
        />

        <Route path="*" element={<Navigate to="/teacher/courses" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default TeacherRoute;
