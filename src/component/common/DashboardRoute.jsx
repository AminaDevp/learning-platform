import DashboardLayout from "./layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const STUDENT_LINKS = [
  { to: "/dashboard", label: "الرئيسية" },
  { to: "/dashboard/courses", label: "كورساتي" },
  { to: "/dashboard/schedule", label: "جدولي" },
];

const INSTRUCTOR_LINKS = [
  { to: "/dashboard", label: "الرئيسية" },
  { to: "/dashboard/students", label: "طلابي" },
  { to: "/dashboard/schedule", label: "جدولي" },
];

export default function DashboardRoute() {
  const { user } = useAuth();
  const isInstructor = user?.role === "teacher" || user?.role === "instructor";

  if (!user) {
    return <Navigate to="/login" replace />;
  }
// If user is Admin, redirect to the Admin Control Panel
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  return (
    <DashboardLayout
      sidebarLinks={isInstructor ? INSTRUCTOR_LINKS : STUDENT_LINKS}
      title={isInstructor ? "لوحة المدرس" : "لوحة الطالب"}
    >
      <Outlet />
    </DashboardLayout>
  );
}