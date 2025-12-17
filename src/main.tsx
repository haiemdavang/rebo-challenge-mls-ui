import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { setupAxiosInterceptors } from "./services/AxiosInstant.ts";
import { logoutState } from "./store/authSlice.ts";
import { store } from "./store/store.ts";

setupAxiosInterceptors(store, logoutState);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
