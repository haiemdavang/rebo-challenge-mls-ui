import {
  Badge,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { RiMapPinLine, RiTimeLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import { fetchSchedule } from "../store/dashboardSlice";

const SchedulePage = () => {
  const dispatch = useAppDispatch();
  const { schedule, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={2}>Thời khóa biểu</Title>

        {schedule && (
          <Text c="dimmed" size="sm">
            Tuần từ {schedule.week_start} đến {schedule.week_end}
          </Text>
        )}

        <Stack gap="md">
          {loading ? (
            <Text>Đang tải...</Text>
          ) : schedule?.courses && schedule.courses.length > 0 ? (
            schedule.courses.map((course) => (
              <Card key={course.id} withBorder p="lg" radius="md">
                <Group justify="space-between" wrap="nowrap">
                  <div className="flex-1">
                    <Text fw={600} size="lg" mb="xs">
                      {course.fullname}
                    </Text>
                    <Group gap="md">
                      <Group gap="xs">
                        <RiTimeLine size={16} color="#0ea5e9" />
                        <Text size="sm" c="dimmed">
                          {course.start_date} - {course.end_date}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <RiMapPinLine size={16} color="#0ea5e9" />
                        <Text size="sm" c="dimmed">
                          {course.teachers?.map((t) => t.fullName).join(", ")}
                        </Text>
                      </Group>
                    </Group>
                  </div>
                  <Badge color="blue" variant="light">
                    {course.format || "Khóa học"}
                  </Badge>
                </Group>
              </Card>
            ))
          ) : (
            <Card withBorder p="xl">
              <Text c="dimmed" ta="center">
                Không có lịch học trong tuần này
              </Text>
            </Card>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default SchedulePage;
