import { Box, Text, Title } from "@mantine/core";
import type { BaseUserDto, UserDto } from "../../types/UserType";

interface WelcomeSectionProps {
  user: BaseUserDto | null | UserDto;
}

const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  return (
    <Box mb="xl">
      <Title order={2} mb="xs">
        Xin chào, {user?.username || "Học sinh"}
      </Title>
      <Text c="dimmed" size="sm">
        {user?.department || "Chưa có thông tin lớp"}
      </Text>
    </Box>
  );
};

export default WelcomeSection;
