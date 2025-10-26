import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

// Define a strict union type for valid roles
type Role = "manager" | "team";

interface RoleBasedRouteProps {
  allowedRoles: Role[]; // only allow predefined roles
  fallbackPath?: string;
}

const RoleBasedRoute = ({
  allowedRoles,
  fallbackPath = "/unauthorized",
}: RoleBasedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Redirect to login if user not found
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if user's role not included
  if (!allowedRoles.includes(user.role as Role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Render nested routes if authorized
  return <Outlet />;
};

export default RoleBasedRoute;
