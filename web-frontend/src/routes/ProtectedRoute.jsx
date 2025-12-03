import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ isAuthenticated, allowedRoles, userRole }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
