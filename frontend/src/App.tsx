import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./lib/hooks";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import Workouts from "./screens/Workouts";

import { setDarkMode } from "./redux/slices/uiSlice";
import NotFound from "./screens/NotFound";
import "./App.css";
import Layout from "./components/Layout";

const App = () => {
  const dispatch = useAppDispatch();


  // Initialize dark mode on app load
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
      dispatch(setDarkMode(true));
    } else {
      document.documentElement.classList.remove("dark");
      dispatch(setDarkMode(false));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
