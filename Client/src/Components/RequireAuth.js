import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const auths = localStorage.getItem("auth");
  console.log(auths);
  return auth?.email || auths.length > 2 ? (
    <Outlet />
  ) : (
    <Navigate to="/form/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
