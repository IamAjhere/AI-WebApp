import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const auths = localStorage.getItem("auth");
  return auth?.email || auths ? (
    <Outlet />
  ) : (
    <Navigate to="/form/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
