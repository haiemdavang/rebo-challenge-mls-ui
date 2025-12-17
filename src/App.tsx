import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "@mantine/dates/styles.css";
import "./App.css";
import { APP_ROUTES } from "./constants";
import { useAppDispatch, useAppSelector } from "./hooks/useAppRedux";
import AuthPage from "./pages/AuthPage";
import StudentRoute from "./routes/StudentRoute";
import TeacherRoute from "./routes/TeacherRoute";
import { fetchCurrentUser } from "./store/authSlice";

function App() {
  const theme = createTheme({
    primaryColor: "blue",
    primaryShade: 5,
    colors: {
      blue: [
        "#f0faff",
        "#e0f5fe",
        "#bae8fd",
        "#7dd5fc",
        "#38bcf8",
        "#0ea5e9",
        "#028ac7",
        "#0370a1",
        "#075e85",
        "#0c506e",
        "#083549",
      ],
    },
    fontFamily: "Inter var, ui-sans-serif, system-ui, sans-serif",
    defaultRadius: "md",
    components: {
      Input: {
        styles: {
          root: { "&:focus": { borderColor: "#0ea5e9" } },
        },
      },
      Button: {
        defaultProps: {
          color: "#0ea5e9",
        },
      },
    },
  });

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user && !isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [user]);

  return (
    <MantineProvider theme={theme}>
      <Notifications position="bottom-right" zIndex={1000} />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Routes>
              <Route path={APP_ROUTES.LOGIN} element={<AuthPage />} />
              <Route path={APP_ROUTES.REGISTER} element={<AuthPage />} />

              {user?.role === "teacher" ? (
                <Route path="/*" element={<TeacherRoute />} />
              ) : (
                <Route path="/*" element={<StudentRoute />} />
              )}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
