import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Home/Dashboard";
import Workouts from "./pages/Workouts/Workouts";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Profile from "./pages/Profile/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import LandingPage from "./pages/landingPage/LandingPage";


const App = () => {
  const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
        <Toaster position="top-center" />
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
