import { NavLink, Stack } from "@mantine/core";
import {
  RiBookOpenLine,
  RiCalendarLine,
  RiHome4Line,
  RiUserLine,
} from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants";
import { useAppSelector } from "../../hooks/useAppRedux";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const studentMenuItems = [
    {
      icon: RiHome4Line,
      label: "Góc học tập",
      path: APP_ROUTES.HOME,
    },
    {
      icon: RiBookOpenLine,
      label: "Danh sách môn học",
      path: APP_ROUTES.COURSES,
    },
    {
      icon: RiCalendarLine,
      label: "Thời khóa biểu",
      path: APP_ROUTES.SCHEDULE,
    },
    {
      icon: RiUserLine,
      label: "Học sinh",
      path: APP_ROUTES.STUDENTS,
    },
  ];

  const teacherMenuItems = [
    {
      icon: RiBookOpenLine,
      label: "Khóa học của tôi",
      path: "/teacher/courses",
    },
  ];

  const menuItems =
    user?.role === "teacher" ? teacherMenuItems : studentMenuItems;

  return (
    <Stack gap="xs">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          active={location.pathname === item.path}
          label={item.label}
          leftSection={<item.icon size={20} />}
          onClick={() => navigate(item.path)}
          className="rounded-lg data-[active]:bg-sky-500 data-[active]:text-white"
        />
      ))}
    </Stack>
  );
};

export default Sidebar;
