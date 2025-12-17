import {
  Button,
  Card,
  Container,
  Group,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { RiArrowLeftLine, RiSaveLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppRedux";
import { createCourse } from "../../store/courseSlice";
import type { CreateCourseRequest } from "../../types/CourseType";

const CourseCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<
    Omit<CreateCourseRequest, "category_id" | "start_date" | "end_date"> & {
      category_id: string;
      start_date: Date | null;
      end_date: Date | null;
    }
  >({
    initialValues: {
      fullname: "",
      shortname: "",
      summary: "",
      format: "online",
      category_id: "",
      start_date: null,
      end_date: null,
      image_url: "",
    },
    validate: {
      fullname: (value) => (!value ? "Vui lòng nhập tên khóa học" : null),
      shortname: (value) => (!value ? "Vui lòng nhập tên viết tắt" : null),
      category_id: (value) => (!value ? "Vui lòng chọn danh mục" : null),
      format: (value) => (!value ? "Vui lòng chọn định dạng" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const courseData: CreateCourseRequest = {
        fullname: values.fullname,
        shortname: values.shortname,
        category_id: Number(values.category_id),
        summary: values.summary || null,
        format: values.format as "online" | "offline" | "hybrid",
        start_date: values.start_date?.toISOString().split("T")[0] || null,
        end_date: values.end_date?.toISOString().split("T")[0] || null,
        image_url: values.image_url || null,
      };

      await dispatch(createCourse(courseData)).unwrap();

      notifications.show({
        title: "Thành công",
        message: "Tạo khóa học thành công!",
        color: "green",
      });
      navigate("/teacher/courses");
    } catch (error: any) {
      notifications.show({
        title: "Lỗi",
        message: error.message || "Tạo khóa học thất bại",
        color: "red",
      });
    }
  };

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
            Tạo khóa học mới
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

              <Select
                label="Danh mục"
                placeholder="Chọn danh mục"
                data={[
                  { value: "1", label: "Toán học" },
                  { value: "2", label: "Ngữ văn" },
                  { value: "3", label: "Tiếng Anh" },
                  { value: "4", label: "Khoa học" },
                ]}
                {...form.getInputProps("category_id")}
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
                  Tạo khóa học
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
};

export default CourseCreatePage;
