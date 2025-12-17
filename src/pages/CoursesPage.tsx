import {
  Container,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import CourseCard from "../components/courses/CourseCard";
import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import { fetchCourses } from "../store/courseSlice";

const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.courses);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(
      fetchCourses({
        search,
        category_id: categoryId ? Number(categoryId) : undefined,
      })
    );
  }, [dispatch, search, categoryId]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={2}>Danh sách môn học</Title>

        <div className="flex gap-4">
          <TextInput
            placeholder="Tìm kiếm môn học..."
            leftSection={<RiSearchLine size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select
            placeholder="Chọn danh mục"
            data={[
              { value: "1", label: "Toán học" },
              { value: "2", label: "Ngữ văn" },
              { value: "3", label: "Tiếng Anh" },
            ]}
            value={categoryId}
            onChange={setCategoryId}
            clearable
            style={{ width: 200 }}
          />
        </div>

        {loading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} height={200} />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};

export default CoursesPage;
