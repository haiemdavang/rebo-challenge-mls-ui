import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import {
  RiArrowLeftLine,
  RiBookOpenLine,
  RiCalendarLine,
  RiFileTextLine,
  RiGroupLine,
  RiPlayCircleLine,
  RiQuestionLine,
  RiUserLine,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import { fetchCourseDetail } from "../store/courseSlice";
import { fetchCourseModules } from "../store/moduleSlice";

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentCourse, loading } = useAppSelector((state) => state.courses);
  const { modules, modulesLoading } = useAppSelector((state) => state.modules);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetail(Number(id)));
      dispatch(fetchCourseModules(Number(id)));
    }
  }, [dispatch, id]);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "video":
        return <RiPlayCircleLine size={20} color="#0ea5e9" />;
      case "quiz":
        return <RiQuestionLine size={20} color="#f59e0b" />;
      case "assignment":
        return <RiFileTextLine size={20} color="#10b981" />;
      default:
        return <RiBookOpenLine size={20} color="#6b7280" />;
    }
  };

  const getModuleColor = (type: string) => {
    switch (type) {
      case "video":
        return "blue";
      case "quiz":
        return "orange";
      case "assignment":
        return "green";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Skeleton height={400} mb="xl" radius="md" />
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Skeleton height={300} radius="md" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Skeleton height={300} radius="md" />
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  if (!currentCourse) {
    return (
      <Container size="xl" py="xl">
        <Card withBorder p="xl" radius="md">
          <Text ta="center" c="dimmed" size="lg">
            Không tìm thấy khóa học
          </Text>
          <Group justify="center" mt="xl">
            <Button
              onClick={() => navigate(-1)}
              leftSection={<RiArrowLeftLine />}
            >
              Quay lại
            </Button>
          </Group>
        </Card>
      </Container>
    );
  }

  return (
    <Box className="bg-gradient-to-br from-blue-50 to-sky-50 min-h-screen">
      <Container size="xl" py="xl">
        <Button
          variant="subtle"
          leftSection={<RiArrowLeftLine size={20} />}
          onClick={() => navigate(-1)}
          mb="xl"
          size="md"
        >
          Quay lại danh sách
        </Button>

        {/* Hero Section */}
        <Paper
          shadow="md"
          radius="lg"
          p={0}
          mb="xl"
          className="overflow-hidden"
        >
          <div className="relative h-64 bg-gradient-to-r from-blue-500 to-sky-600">
            {currentCourse.image_url && (
              <Image
                src={currentCourse.image_url}
                alt={currentCourse.fullname}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Container
              size="xl"
              className="relative h-full flex items-end pb-8"
            >
              <div>
                <Badge size="lg" color="yellow" variant="filled" mb="md">
                  {currentCourse.shortname}
                </Badge>
                <Title
                  order={1}
                  c="white"
                  mb="sm"
                  className="text-4xl font-bold"
                >
                  {currentCourse.fullname}
                </Title>
                <Group gap="xl">
                  <Group gap="xs">
                    <RiUserLine size={18} color="white" />
                    <Text c="white" size="sm" fw={500}>
                      {currentCourse.teachers
                        ?.map((t) => t.fullName)
                        .join(", ") || "Chưa có giáo viên"}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <RiCalendarLine size={18} color="white" />
                    <Text c="white" size="sm" fw={500}>
                      {currentCourse.start_date} - {currentCourse.end_date}
                    </Text>
                  </Group>
                </Group>
              </div>
            </Container>
          </div>
        </Paper>

        <Grid gutter="xl">
          {/* Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Tabs defaultValue="content" variant="pills">
              <Tabs.List mb="xl">
                <Tabs.Tab
                  value="content"
                  leftSection={<RiBookOpenLine size={16} />}
                >
                  Nội dung khóa học
                </Tabs.Tab>
                <Tabs.Tab
                  value="about"
                  leftSection={<RiFileTextLine size={16} />}
                >
                  Giới thiệu
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="content">
                <Card withBorder radius="md" p="xl" shadow="sm">
                  <Title order={3} mb="lg">
                    <Group gap="xs">
                      <RiBookOpenLine size={24} color="#0ea5e9" />
                      <span>Nội dung khóa học</span>
                    </Group>
                  </Title>

                  {modulesLoading ? (
                    <Stack gap="md">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height={80} radius="md" />
                      ))}
                    </Stack>
                  ) : modules.sections && modules.sections.length > 0 ? (
                    <Stack gap="xl">
                      {modules.sections.map((section, index) => (
                        <Box key={index}>
                          <Group mb="md">
                            <Avatar color="blue" radius="xl" size="md">
                              {index + 1}
                            </Avatar>
                            <div>
                              <Text fw={600} size="lg">
                                {section.title}
                              </Text>
                              <Text size="sm" c="dimmed">
                                {section.modules.length} bài học
                              </Text>
                            </div>
                          </Group>

                          <Stack gap="sm" ml="xl">
                            {section.modules.map((module: any, idx: number) => (
                              <Paper
                                key={module.id}
                                withBorder
                                p="md"
                                radius="md"
                                className="hover:shadow-md transition-shadow cursor-pointer"
                              >
                                <Group justify="space-between" wrap="nowrap">
                                  <Group gap="md" style={{ flex: 1 }}>
                                    {getModuleIcon(module.type)}
                                    <div style={{ flex: 1 }}>
                                      <Group gap="xs" mb={4}>
                                        <Text fw={500} size="sm">
                                          Bài {idx + 1}:
                                        </Text>
                                        <Text fw={600}>{module.title}</Text>
                                      </Group>
                                      {module.content && (
                                        <Text
                                          size="sm"
                                          c="dimmed"
                                          lineClamp={2}
                                        >
                                          {module.content}
                                        </Text>
                                      )}
                                    </div>
                                  </Group>
                                  <Badge
                                    color={getModuleColor(module.type)}
                                    variant="light"
                                    size="lg"
                                  >
                                    {module.type}
                                  </Badge>
                                </Group>
                              </Paper>
                            ))}
                          </Stack>

                          {index < modules.sections.length - 1 && (
                            <Divider my="xl" />
                          )}
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Paper
                      withBorder
                      p="xl"
                      radius="md"
                      className="text-center"
                    >
                      <RiBookOpenLine
                        size={48}
                        color="#d1d5db"
                        className="mx-auto mb-4"
                      />
                      <Text c="dimmed" size="lg" fw={500}>
                        Chưa có nội dung khóa học
                      </Text>
                      <Text c="dimmed" size="sm" mt="xs">
                        Nội dung sẽ được cập nhật sớm
                      </Text>
                    </Paper>
                  )}
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="about">
                <Card withBorder radius="md" p="xl" shadow="sm">
                  <Title order={3} mb="md">
                    Giới thiệu khóa học
                  </Title>
                  {currentCourse.summary ? (
                    <Text size="sm" style={{ lineHeight: 1.8 }}>
                      {currentCourse.summary}
                    </Text>
                  ) : (
                    <Text c="dimmed" ta="center" py="xl">
                      Chưa có thông tin giới thiệu
                    </Text>
                  )}
                </Card>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>

          {/* Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              {/* Course Info Card */}
              <Card withBorder radius="md" p="lg" shadow="sm">
                <Title order={4} mb="md">
                  Thông tin khóa học
                </Title>
                <Stack gap="md">
                  <Group gap="sm">
                    <Avatar color="blue" radius="xl" size="sm">
                      <RiGroupLine size={16} />
                    </Avatar>
                    <div>
                      <Text size="xs" c="dimmed">
                        Định dạng
                      </Text>
                      <Text size="sm" fw={500}>
                        {currentCourse.format || "Khóa học"}
                      </Text>
                    </div>
                  </Group>

                  <Divider />

                  <Group gap="sm">
                    <Avatar color="green" radius="xl" size="sm">
                      <RiCalendarLine size={16} />
                    </Avatar>
                    <div>
                      <Text size="xs" c="dimmed">
                        Thời gian
                      </Text>
                      <Text size="sm" fw={500}>
                        {currentCourse.start_date} - {currentCourse.end_date}
                      </Text>
                    </div>
                  </Group>

                  {currentCourse.category && (
                    <>
                      <Divider />
                      <Group gap="sm">
                        <Avatar color="orange" radius="xl" size="sm">
                          <RiBookOpenLine size={16} />
                        </Avatar>
                        <div>
                          <Text size="xs" c="dimmed">
                            Danh mục
                          </Text>
                          <Text size="sm" fw={500}>
                            {currentCourse.category.name}
                          </Text>
                        </div>
                      </Group>
                    </>
                  )}
                </Stack>
              </Card>

              {/* Teachers Card */}
              {currentCourse.teachers && currentCourse.teachers.length > 0 && (
                <Card withBorder radius="md" p="lg" shadow="sm">
                  <Title order={4} mb="md">
                    Giảng viên
                  </Title>
                  <Stack gap="md">
                    {currentCourse.teachers.map((teacher) => (
                      <Group key={teacher.id} gap="sm">
                        <Avatar color="blue" radius="xl" size="md">
                          {teacher.fullName.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                          <Text fw={500}>{teacher.fullName}</Text>
                          <Text size="xs" c="dimmed">
                            {teacher.email}
                          </Text>
                        </div>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              )}

              {/* Action Button */}
              <Button
                size="lg"
                fullWidth
                leftSection={<RiPlayCircleLine size={20} />}
              >
                Bắt đầu học
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseDetailPage;
