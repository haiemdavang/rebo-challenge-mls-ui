import { Button } from "@mantine/core";
import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { SignIn } from "../components/Auth/SignIn";
import { SignUp } from "../components/Auth/SignUp";
import { APP_ROUTES } from "../constants";
import { useAppSelector } from "../hooks/useAppRedux";

export function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.HOME);
    }
    if (
      location.pathname !== APP_ROUTES.LOGIN &&
      location.pathname !== APP_ROUTES.REGISTER
    ) {
      navigate(APP_ROUTES.LOGIN);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-[90vh] font-['Inter'] overflow-hidden relative bg-white">
      <span
        onClick={() => navigate("/")}
        className="m-4 inline-block absolute top-5 left-5 cursor-pointer z-50"
      >
        <Button leftSection={<FiArrowLeft size={20} />} variant="light">
          Quay lại
        </Button>
      </span>

      <div
        className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 duration-1000 transition-all ${
          location.pathname === "/login" ? "translate-x-0" : "-translate-x-1/2"
        }`}
      >
        <SignIn />

        <div
          className={`w-1/2 bg-primary/10 flex flex-col items-center gap-4 justify-center duration-200 transition-all ease-in-out ${
            location.pathname === "/login"
              ? "rounded-l-[200px]"
              : "rounded-r-[200px]"
          }`}
        >
          <div className="flex gap-3 items-center text-primary">
            <div className="h-16 overflow-hidden rounded-lg  flex items-center justify-center">
              <img
                src="logo.jpg"
                alt="RikiEdu Logo"
                className="h-16 w-16 object-cover"
              />
            </div>
            <div className="text-4xl font-semibold">
              <span className="text-primary">Riki </span>
              <span className="text-slate-700">Edu</span>
            </div>
          </div>
          <div className="text-2xl font-semibold text-slate-700">
            Nền tảng giáo dục trực tuyến
          </div>
        </div>

        <SignUp />
      </div>
    </div>
  );
}

export default AuthPage;
