import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import {
  RiArrowLeftLine,
  RiBookOpenLine,
  RiGroupLine,
  RiSettingsLine,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { fetchCourseDetail } from "../../store/courseSlice";
import { fetchCourseStudents } from "../../store/studentSlice";

const CourseManagePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentCourse } = useAppSelector((state) => state.courses);
  const { students = [] } = useAppSelector((state) => state.students);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetail(Number(id)));
      dispatch(fetchCourseStudents(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Button
          variant="subtle"
          leftSection={<RiArrowLeftLine size={20} />}
          onClick={() => navigate("/teacher/courses")}
        >
          Quay lại danh sách
        </Button>

        <Card withBorder p="lg">
          <Group justify="space-between">
            <div>
              <Title order={2}>{currentCourse?.fullname}</Title>
              <Text c="dimmed" size="sm">
                {currentCourse?.shortname}
              </Text>
            </div>
            <Button
              leftSection={<RiSettingsLine size={16} />}
              onClick={() => navigate(`/teacher/courses/${id}/edit`)}
            >
              Chỉnh sửa
            </Button>
          </Group>
        </Card>

        <Tabs defaultValue="students" variant="pills">
          <Tabs.List>
            <Tabs.Tab value="students" leftSection={<RiGroupLine size={16} />}>
              Học sinh ({Array.isArray(students) ? students.length : 0})
            </Tabs.Tab>
            <Tabs.Tab
              value="modules"
              leftSection={<RiBookOpenLine size={16} />}
            >
              Nội dung
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="students" pt="xl">
            <Card withBorder p="lg">
              <Title order={4} mb="md">
                Danh sách học sinh
              </Title>
              {!Array.isArray(students) || students.length === 0 ? (
                <Text c="dimmed" ta="center" py="xl">
                  Chưa có học sinh nào đăng ký
                </Text>
              ) : (
                <Stack gap="sm">
                  {students.map((student) => (
                    <Card key={student.id} withBorder p="md">
                      <Group>
                        <Avatar color="blue" radius="xl">
                          {student.fullName.charAt(0)}
                        </Avatar>
                        <div style={{ flex: 1 }}>
                          <Text fw={500}>{student.fullName}</Text>
                          <Text size="sm" c="dimmed">
                            {student.email}
                          </Text>
                        </div>
                        <Badge>{student.department || "Chưa có lớp"}</Badge>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              )}
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="modules" pt="xl">
            <Card withBorder p="lg">
              <Title order={4} mb="md">
                Quản lý nội dung khóa học
              </Title>
              <Text c="dimmed">Tính năng đang được phát triển...</Text>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default CourseManagePage;
