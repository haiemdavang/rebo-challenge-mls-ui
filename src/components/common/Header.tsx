import {
  Avatar,
  Burger,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { RiArrowDownSLine, RiLogoutBoxLine, RiUserLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { logout } from "../../store/authSlice";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: HeaderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate(APP_ROUTES.LOGIN);
  };

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Text size="xl" fw={700} c="blue">
          LMS Platform
        </Text>
      </Group>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <Group gap="xs">
              <Avatar color="blue" radius="xl">
                {user?.fullName?.charAt(0).toUpperCase()}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {user?.fullName}
                </Text>
                <Text c="dimmed" size="xs">
                  {user?.role}
                </Text>
              </div>
              <RiArrowDownSLine size={16} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<RiUserLine size={16} />}
            onClick={() => navigate(APP_ROUTES.PROFILE)}
          >
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            leftSection={<RiLogoutBoxLine size={16} />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default Header;
