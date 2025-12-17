import {
  Button,
  Group,
  Modal,
  PasswordInput,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import type { Timeout } from "react-number-format/types/types";
import { validateEmail, validatePassword } from "../../untils/ValidateInput";
import showErrorNotification from "../Toast/NotificationError";

interface ResetPasswordProps {
  opened: boolean;
  close: () => void;
}

export function ResetPassword(props: ResetPasswordProps) {
  const [otpSend, setOtpSend] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [timeRequest, setTimeRequest] = useState(30);

  const form = useForm({
    initialValues: {
      email: "",
      otp: "",
      password: "",
    },

    validate: {
      email: (value) => validateEmail(value),
      otp: (value) =>
        otpSend && !verifyOtp && value.length !== 6
          ? "Mã OTP không hợp lệ"
          : null,
      password: (value) => validatePassword(value),
    },
  });

  useEffect(() => {
    let interval: Timeout;
    if (timeRequest > 0) {
      interval = setInterval(() => {
        setTimeRequest((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeRequest]);

  const handleSendOTP = async () => {
    const emailError = form.validateField("email").hasError;
    if (emailError) {
      return;
    }
    setOtpSending(true);
    showErrorNotification(
      "Thoong baos",
      "Chức năng gửi OTP hiện đang được bảo trì."
    );
    setOtpSending(false);
  };

  const handleVerifyOtp = async (otpValue: string) => {
    form.setFieldValue("otp", otpValue);

    if (otpValue.length === 6) {
      showErrorNotification(
        "Thoong baos",
        "Chức năng xác thực OTP hiện đang được bảo trì."
      );
    } else {
      form.setFieldError("otp", "Mã OTP phải có 6 ký tự");
    }
  };

  const handleChangeEmail = () => {
    setOtpSend(false);
    setVerifyOtp(false);
    form.reset();
  };

  const handleChangePass = async () => {
    const passwordError = form.validateField("password").hasError;
    if (passwordError) {
      return;
    }
    setResetting(true);
    showErrorNotification(
      "Thoong baos",
      "Chức năng đặt lại mật khẩu hiện đang được bảo trì."
    );
    setResetting(false);
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title={
        <div className="text-xl font-semibold text-slate-800">
          Đặt lại mật khẩu
        </div>
      }
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack gap="md">
          {!verifyOtp && (
            <Text size="sm" className="text-gray-500 mt-2 mb-2">
              Nhập email của bạn để nhận mã OTP đặt lại mật khẩu
            </Text>
          )}

          <TextInput
            required
            label="Email"
            placeholder="Email của bạn"
            disabled={otpSend}
            leftSection={<FiMail className="w-5 h-5" />}
            rightSection={
              <Button
                size="xs"
                className="m-1"
                variant="filled"
                onClick={handleSendOTP}
                disabled={!form.values.email.trim() || otpSend || otpSending}
                loading={otpSending}
              >
                Gửi OTP
              </Button>
            }
            rightSectionWidth={100}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          {otpSend && (
            <>
              <Text size="sm" className="text-gray-500 text-center">
                Nhập mã OTP đã được gửi đến email của bạn
              </Text>
              <Group justify="center">
                <PinInput
                  autoFocus
                  type="number"
                  length={6}
                  size="md"
                  onComplete={handleVerifyOtp}
                  onChange={(value) => form.setFieldValue("otp", value)}
                  // error={!!form.errors.otp} // Sử dụng lỗi từ useForm
                />
              </Group>
              {form.errors.otp && (
                <Text size="sm" color="red" className="text-center">
                  {form.errors.otp}
                </Text>
              )}

              <Group grow>
                <Button
                  variant="light"
                  color="primary"
                  disabled={timeRequest > 0 || otpSending || verifyOtp}
                  onClick={handleSendOTP}
                >
                  {timeRequest > 0 ? `${timeRequest}s` : "Gửi lại"}
                </Button>
                <Button
                  variant="filled"
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleChangeEmail}
                >
                  Đổi email
                </Button>
              </Group>
            </>
          )}

          {verifyOtp && (
            <>
              <PasswordInput
                required
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />

              <Button
                fullWidth
                variant="filled"
                className="bg-primary hover:bg-primary/90"
                onClick={handleChangePass}
                loading={resetting}
              >
                Đặt lại mật khẩu
              </Button>
            </>
          )}
        </Stack>
      </form>
    </Modal>
  );
}

export default ResetPassword;
