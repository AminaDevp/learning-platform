import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import AdminLayout from "../common/layout/AdminLayout";

export default function AdminRoute() {
  const { user } = useAuth();

  // 1. Redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Prevent non-admin users (students/teachers) from entering admin views
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Render AdminLayout with nested <Outlet /> child routes
  return <AdminLayout />;
}