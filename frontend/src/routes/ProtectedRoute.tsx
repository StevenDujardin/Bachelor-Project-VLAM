import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/useAuth";
import { Loading } from "../pages/Loading";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    // Show a loading spinner or some kind of loading indicator while fetching auth status
    return <Loading></Loading>;
  }

  // Check if the user is authenticated
  if (!isLoggedIn) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
