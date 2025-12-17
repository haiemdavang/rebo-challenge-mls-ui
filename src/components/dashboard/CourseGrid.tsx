import { Box, SimpleGrid, Skeleton, Title } from "@mantine/core";
import type { CourseDto } from "../../types/CourseType";
import CourseCard from "../courses/CourseCard";

interface CourseGridProps {
  courses: CourseDto[];
  loading: boolean;
}

const CourseGrid = ({ courses, loading }: CourseGridProps) => {
  if (loading) {
    return (
      <Box>
        <Skeleton height={20} width={200} mb="md" />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={200} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box>
      <Title order={3} mb="md">
        Danh sách môn học
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CourseGrid;
