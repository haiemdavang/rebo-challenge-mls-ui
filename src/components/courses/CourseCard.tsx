import { Avatar, Card, Group, Stack, Text } from "@mantine/core";
import { RiBookOpenLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants";
import type { CourseDto } from "../../types/CourseType";

interface CourseCardProps {
  course: CourseDto;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  const getCourseIcon = (courseName: string) => {
    if (courseName.toLowerCase().includes("toán")) return "📐";
    if (courseName.toLowerCase().includes("văn")) return "📚";
    if (courseName.toLowerCase().includes("anh")) return "🇬🇧";
    if (courseName.toLowerCase().includes("lý")) return "⚗️";
    if (courseName.toLowerCase().includes("hóa")) return "🧪";
    return "📖";
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() =>
        navigate(APP_ROUTES.COURSE_DETAIL.replace(":id", course.id.toString()))
      }
      style={{ cursor: "pointer", transition: "transform 0.2s" }}
      className="hover:scale-105"
    >
      <Stack gap="md">
        <Group justify="center">
          <Avatar size={80} radius="md" color="blue">
            <Text size="2.5rem">{getCourseIcon(course.fullname)}</Text>
          </Avatar>
        </Group>

        <Stack gap="xs">
          <Text fw={600} size="lg" ta="center" lineClamp={2}>
            {course.fullname}
          </Text>

          <Group justify="center" gap="xs">
            <RiBookOpenLine size={16} color="#0ea5e9" />
            <Text size="sm" c="dimmed">
              {course.teachers?.map((t) => t.fullName).join(", ") ||
                "Chưa có giáo viên"}
            </Text>
          </Group>

          {course.category && (
            <Text size="xs" c="blue" ta="center">
              {course.category.name}
            </Text>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default CourseCard;
