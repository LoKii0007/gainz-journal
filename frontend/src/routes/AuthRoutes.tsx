import { Navigate, Outlet } from "react-router-dom";
import { useInitAuth, useAppSelector } from "../lib/hooks";

const AuthRoutes = () => {
  useInitAuth()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render login/register routes
  return <Outlet />;
};

export default AuthRoutes; 