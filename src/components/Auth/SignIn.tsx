import {
  Anchor,
  Button,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { APP_ROUTES } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { login } from "../../store/authSlice";
import type { LoginRequest } from "../../types/AuthType";
import type { BaseUserDto } from "../../types/UserType";
import { getErrorMessage } from "../../untils/ErrorUntils";
import showErrorNotification from "../Toast/NotificationError";
import showSuccessNotification from "../Toast/NotificationSuccess";
import ResetPassword from "./ResetPasswrod";

interface SignInFormValues {
  email: string;
  password: string;
}

export function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("redirect") || "/";

  const dispatch = useAppDispatch();
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<SignInFormValues>({
    initialValues: {
      email: "parisian.yvonne",
      password: "password",
    },
    validate: {
      email: (value) => {
        return value.length > 0 ? null : "Email không được để trống";
      },
      password: (value) => {
        return value.length > 0 ? null : "Mật khẩu không được để trống";
      },
    },
  });
  const handleSubmit = async (values: SignInFormValues) => {
    form.clearErrors();
    const loginData: LoginRequest = {
      username: values.email,
      password: values.password,
    };

    try {
      const resultAction = await dispatch(login(loginData)).unwrap();
      const user: BaseUserDto = resultAction.user;

      showSuccessNotification(
        "Đăng nhập thành công!",
        `Chào mừng ${user.fullName || user.username} trở lại!`
      );
      navigate(returnUrl);
      if (returnUrl === "/" && user.role === "admin") {
        navigate(APP_ROUTES.ADMIN.DASH);
      }
    } catch (err: any) {
      showErrorNotification("Đăng nhập thất bại", getErrorMessage(err));
    }
  };

  const handleGoogleLogin = () => {
    showErrorNotification(
      "Chức năng đang phát triển",
      "Đăng ký bằng Google sẽ sớm được ra mắt!"
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(returnUrl);
    }
  }, [isAuthenticated]);

  return (
    <motion.div
      className="w-1/2 bg-white flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Title
          order={1}
          className="text-3xl font-bold mb-6 text-center text-slate-800"
        >
          Đăng nhập
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Tên đăng nhập"
              placeholder="your.username"
              required
              {...form.getInputProps("email")}
              size="md"
            />

            <PasswordInput
              label="Mật khẩu"
              placeholder="Mật khẩu của bạn"
              required
              {...form.getInputProps("password")}
              size="md"
            />

            <Group justify="apart">
              <Anchor
                size="sm"
                component="button"
                type="button"
                className="text-primary"
                onClick={open}
              >
                Quên mật khẩu?
              </Anchor>
            </Group>

            <Button
              fullWidth
              type="submit"
              loading={loading}
              className="bg-primary hover:bg-primary/90 mt-4"
              size="md"
            >
              Đăng nhập
            </Button>
          </Stack>
        </form>

        <Divider label="Hoặc đăng nhập với" labelPosition="center" my="lg" />

        <Group grow>
          <Button
            leftSection={<FaGoogle size={16} />}
            variant="outline"
            className="border-gray-300"
            onClick={() => handleGoogleLogin()}
          >
            Google
          </Button>
          <Button
            leftSection={<FaFacebook size={16} />}
            variant="outline"
            className="border-gray-300"
            onClick={() =>
              showSuccessNotification(
                "Chức năng đang phát triển",
                "Đăng ký bằng Facebook sẽ sớm được ra mắt!"
              )
            }
          >
            Facebook
          </Button>
        </Group>

        <Text className="!mt-6 text-center !text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </Text>
        {opened && <ResetPassword opened={opened} close={close} />}
      </motion.div>
    </motion.div>
  );
}
