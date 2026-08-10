import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute() {
  const { user } = useAuth();

  // السماح بمرور الـ super_admin أو الـ admin الخاص بقسم معين
  const hasAccess = user && (user.role === "super_admin" || user.role === "admin");

  if (!hasAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}