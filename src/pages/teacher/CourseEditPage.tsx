import {
  Button,
  Card,
  Container,
  Group,
  Select,
  Skeleton,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { RiArrowLeftLine, RiSaveLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { fetchCourseDetail, updateCourse } from "../../store/courseSlice";

const CourseEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentCourse, loading } = useAppSelector((state) => state.courses);

  const form = useForm<{
    fullname: string;
    shortname: string;
    summary: string;
    format: string;
    start_date: Date | null;
    end_date: Date | null;
    image_url: string;
  }>({
    initialValues: {
      fullname: "",
      shortname: "",
      summary: "",
      format: "",
      start_date: null,
      end_date: null,
      image_url: "",
    },
    validate: {
      fullname: (value) => (!value ? "Vui lòng nhập tên khóa học" : null),
      shortname: (value) => (!value ? "Vui lòng nhập tên viết tắt" : null),
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetail(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentCourse) {
      form.setValues({
        fullname: currentCourse.fullname,
        shortname: currentCourse.shortname,
        summary: currentCourse.summary || "",
        format: currentCourse.format || "",
        start_date: currentCourse.start_date
          ? new Date(currentCourse.start_date)
          : null,
        end_date: currentCourse.end_date
          ? new Date(currentCourse.end_date)
          : null,
        image_url: currentCourse.image_url || "",
      });
    }
  }, [currentCourse]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await dispatch(
        updateCourse({
          id: Number(id),
          data: {
            fullname: values.fullname,
            shortname: values.shortname,
            summary: values.summary || null,
            format: values.format as "online" | "offline" | "hybrid",
            start_date: values.start_date?.toISOString().split("T")[0] || null,
            end_date: values.end_date?.toISOString().split("T")[0] || null,
            image_url: values.image_url || null,
          },
        })
      ).unwrap();

      notifications.show({
        title: "Thành công",
        message: "Cập nhật khóa học thành công!",
        color: "green",
      });
      navigate("/teacher/courses");
    } catch (error: any) {
      notifications.show({
        title: "Lỗi",
        message: error.message || "Cập nhật khóa học thất bại",
        color: "red",
      });
    }
  };

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Skeleton height={60} mb="xl" />
        <Skeleton height={400} />
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Button
          variant="subtle"
          leftSection={<RiArrowLeftLine size={20} />}
          onClick={() => navigate("/teacher/courses")}
        >
          Quay lại danh sách
        </Button>

        <Card withBorder radius="md" p="xl">
          <Title order={2} mb="xl">
            Chỉnh sửa khóa học
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Tên khóa học"
                placeholder="Nhập tên khóa học"
                {...form.getInputProps("fullname")}
                required
              />

              <TextInput
                label="Tên viết tắt"
                placeholder="Ví dụ: MATH101"
                {...form.getInputProps("shortname")}
                required
              />

              <Textarea
                label="Mô tả"
                placeholder="Nhập mô tả khóa học"
                {...form.getInputProps("summary")}
                minRows={4}
              />

              <Select
                label="Định dạng"
                placeholder="Chọn định dạng"
                data={[
                  { value: "online", label: "Trực tuyến" },
                  { value: "offline", label: "Trực tiếp" },
                  { value: "hybrid", label: "Kết hợp" },
                ]}
                {...form.getInputProps("format")}
              />

              <Group grow>
                <DatePickerInput
                  label="Ngày bắt đầu"
                  placeholder="Chọn ngày"
                  {...form.getInputProps("start_date")}
                />

                <DatePickerInput
                  label="Ngày kết thúc"
                  placeholder="Chọn ngày"
                  {...form.getInputProps("end_date")}
                />
              </Group>

              <TextInput
                label="URL hình ảnh"
                placeholder="https://example.com/image.jpg"
                {...form.getInputProps("image_url")}
              />

              <Group justify="flex-end" mt="xl">
                <Button
                  variant="light"
                  onClick={() => navigate("/teacher/courses")}
                >
                  Hủy
                </Button>
                <Button type="submit" leftSection={<RiSaveLine size={20} />}>
                  Lưu thay đổi
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
};

export default CourseEditPage;
