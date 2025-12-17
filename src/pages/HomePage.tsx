import { Container } from "@mantine/core";
import { useEffect } from "react";
import CourseGrid from "../components/dashboard/CourseGrid";
import TodaySchedule from "../components/dashboard/TodaySchedule";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import { fetchMyCourses, fetchSchedule } from "../store/dashboardSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { courses, schedule, loading } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchMyCourses({ status: "upcoming" }));
    dispatch(fetchSchedule());
  }, [dispatch]);

  return (
    <Container size="xl" py="xl">
      <WelcomeSection user={user} />
      <TodaySchedule schedule={schedule} loading={loading} />
      <CourseGrid courses={courses} loading={loading} />
    </Container>
  );
};

export default HomePage;
