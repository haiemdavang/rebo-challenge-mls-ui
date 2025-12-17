import { Box, Card, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import { RiTimeLine } from "react-icons/ri";
import type { CourseDto } from "../../types/CourseType";

interface TodayScheduleProps {
  schedule: {
    week_start: string;
    week_end: string;
    courses: CourseDto[];
  } | null;
  loading: boolean;
}

const TodaySchedule = ({ schedule, loading }: TodayScheduleProps) => {
  if (loading) {
    return (
      <Box mb="xl">
        <Skeleton height={20} width={200} mb="md" />
        <Skeleton height={100} />
      </Box>
    );
  }

  const todayCourses = schedule?.courses?.slice(0, 2) || [];

  return (
    <Box mb="xl">
      <Title order={3} mb="md">
        Thời khóa biểu hôm nay
      </Title>
      {todayCourses.length === 0 ? (
        <Card withBorder p="md">
          <Text c="dimmed" ta="center">
            Không có lịch học hôm nay
          </Text>
        </Card>
      ) : (
        <Stack gap="sm">
          {todayCourses.map((course) => (
            <Card key={course.id} withBorder p="md" radius="md">
              <Group>
                <RiTimeLine size={20} color="#0ea5e9" />
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{course.fullname}</Text>
                  <Text size="sm" c="dimmed">
                    {course.teachers?.map((t) => t.fullName).join(", ")}
                  </Text>
                </div>
                <Text size="sm" c="blue" fw={500}>
                  8:00 - 9:30
                </Text>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TodaySchedule;
