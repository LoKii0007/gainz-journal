import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useInitAuth } from "../lib/hooks";
import LoadingScreen from "../components/ui/LoadingScreen";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isInitialized } = useInitAuth();

  // Show loading screen while checking auth status
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render protected routes
  return <Outlet />;
};

export default PrivateRoutes; 