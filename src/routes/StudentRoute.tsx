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
import CourseDetailPage from "../pages/CourseDetailPage";
import CoursesPage from "../pages/CoursesPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import SchedulePage from "../pages/SchedulePage";
import StudentsPage from "../pages/StudentsPage";

const StudentRoute = () => {
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

    if (user?.role === "admin") {
      notifications.show({
        title: "Quyền truy cập bị từ chối",
        message: "Bạn sẽ được chuyển đến trang quản trị.",
        color: "red",
      });
    }
  }, [isAuthenticated, user, navigate, location]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentRoute;
