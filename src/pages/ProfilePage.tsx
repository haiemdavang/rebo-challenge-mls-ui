import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Select,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { RiEditLine, RiSaveLine, RiUserLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks/useAppRedux";
import { fetchUserProfile, updateUserProfile } from "../store/userSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    birthday: Date | null;
    gender: string;
    id_number: string;
    department: string;
  }>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      birthday: null,
      gender: "",
      id_number: "",
      department: "",
    },
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      form.setValues({
        firstname: profile.firstname || "",
        lastname: profile.lastname || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        birthday: profile.birthday ? new Date(profile.birthday) : null,
        gender: profile.gender || "",
        id_number: profile.id_number || "",
        department: profile.department || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await dispatch(
        updateUserProfile({
          ...values,
          birthday: values.birthday?.toISOString().split("T")[0] || null,
        })
      ).unwrap();

      notifications.show({
        title: "Thành công",
        message: "Cập nhật thông tin thành công!",
        color: "green",
      });
      setIsEditing(false);
    } catch (error: any) {
      notifications.show({
        title: "Lỗi",
        message: error.message || "Cập nhật thông tin thất bại",
        color: "red",
      });
    }
  };

  if (loading && !profile) {
    return (
      <Container size="md" py="xl">
        <Skeleton height={300} />
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Card withBorder p="xl">
          <Group justify="space-between" mb="xl">
            <Group>
              <Avatar size="xl" color="blue" radius="xl">
                <RiUserLine size={40} />
              </Avatar>
              <div>
                <Title order={2}>{profile?.fullname}</Title>
                <Text c="dimmed" size="sm">
                  @{profile?.username}
                </Text>
                {/* <Badge mt="xs">{profile?.role.name}</Badge> */}
              </div>
            </Group>
            {!isEditing && (
              <Button
                leftSection={<RiEditLine size={16} />}
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </Button>
            )}
          </Group>

          <Divider mb="xl" />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <Group grow>
                <TextInput
                  label="Họ"
                  {...form.getInputProps("firstname")}
                  disabled={!isEditing}
                />
                <TextInput
                  label="Tên"
                  {...form.getInputProps("lastname")}
                  disabled={!isEditing}
                />
              </Group>

              <TextInput
                label="Email"
                type="email"
                {...form.getInputProps("email")}
                disabled={!isEditing}
              />

              <TextInput
                label="Số điện thoại"
                {...form.getInputProps("phone")}
                disabled={!isEditing}
              />

              <TextInput
                label="Địa chỉ"
                {...form.getInputProps("address")}
                disabled={!isEditing}
              />

              <Group grow>
                <DatePickerInput
                  label="Ngày sinh"
                  {...form.getInputProps("birthday")}
                  disabled={!isEditing}
                />
                <Select
                  label="Giới tính"
                  data={[
                    { value: "male", label: "Nam" },
                    { value: "female", label: "Nữ" },
                    { value: "other", label: "Khác" },
                  ]}
                  {...form.getInputProps("gender")}
                  disabled={!isEditing}
                />
              </Group>

              <TextInput
                label="CMND/CCCD"
                {...form.getInputProps("id_number")}
                disabled={!isEditing}
              />

              <TextInput
                label="Phòng ban/Lớp"
                {...form.getInputProps("department")}
                disabled={!isEditing}
              />

              {isEditing && (
                <Group justify="flex-end" mt="xl">
                  <Button variant="light" onClick={() => setIsEditing(false)}>
                    Hủy
                  </Button>
                  <Button type="submit" leftSection={<RiSaveLine size={20} />}>
                    Lưu thay đổi
                  </Button>
                </Group>
              )}
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
