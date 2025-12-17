import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  RiAddLine,
  RiEditLine,
  RiSearchLine,
  RiSettingsLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { fetchMyCourses } from "../../store/dashboardSlice";

const TeacherCoursesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.dashboard);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchMyCourses({}));
  }, [dispatch]);

  const filteredCourses = courses.filter((course) =>
    course.fullname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Khóa học của tôi</Title>
            <Text c="dimmed" size="sm">
              Quản lý và chỉnh sửa các khóa học bạn đang giảng dạy
            </Text>
          </div>
          <Button
            leftSection={<RiAddLine size={20} />}
            onClick={() => navigate("/teacher/courses/create")}
            size="md"
          >
            Tạo khóa học mới
          </Button>
        </Group>

        <TextInput
          placeholder="Tìm kiếm khóa học..."
          leftSection={<RiSearchLine size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="md"
        />

        {loading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height={250} />
            ))}
          </SimpleGrid>
        ) : filteredCourses.length === 0 ? (
          <Card withBorder p="xl" radius="md">
            <Text ta="center" c="dimmed" size="lg">
              {search
                ? "Không tìm thấy khóa học phù hợp"
                : "Bạn chưa có khóa học nào"}
            </Text>
            {!search && (
              <Group justify="center" mt="xl">
                <Button
                  leftSection={<RiAddLine />}
                  onClick={() => navigate("/teacher/courses/create")}
                >
                  Tạo khóa học đầu tiên
                </Button>
              </Group>
            )}
          </Card>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="hover:shadow-md transition-shadow"
              >
                <Stack gap="md">
                  <div>
                    <Group justify="space-between" mb="xs">
                      <Badge color="blue" variant="light">
                        {course.shortname}
                      </Badge>
                      <Badge
                        color={course.format === "online" ? "green" : "orange"}
                        size="sm"
                      >
                        {course.format || "Khóa học"}
                      </Badge>
                    </Group>
                    <Title order={4} lineClamp={2} mb="xs">
                      {course.fullname}
                    </Title>
                    {course.summary && (
                      <Text size="sm" c="dimmed" lineClamp={3}>
                        {course.summary}
                      </Text>
                    )}
                  </div>

                  <div>
                    <Text size="xs" c="dimmed" mb={4}>
                      Thời gian
                    </Text>
                    <Text size="sm" fw={500}>
                      {course.start_date} - {course.end_date}
                    </Text>
                  </div>

                  <Group gap="xs">
                    <Button
                      variant="light"
                      leftSection={<RiEditLine size={16} />}
                      onClick={() =>
                        navigate(`/teacher/courses/${course.id}/edit`)
                      }
                      fullWidth
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="light"
                      color="green"
                      leftSection={<RiSettingsLine size={16} />}
                      onClick={() =>
                        navigate(`/teacher/courses/${course.id}/manage`)
                      }
                      fullWidth
                    >
                      Quản lý
                    </Button>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};

export default TeacherCoursesPage;
