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
  { to: "/dashboard/profile", label: "ملفي الشخصي" },
  { to: "/dashboard/students", label: "طلابي" },
  { to: "/dashboard/schedule", label: "جدولي" },
  { to: "/dashboard/suggest-course", label: "اقترح كورس" },
];

export default function DashboardRoute() {
  const { user } = useAuth();
  const isInstructor = user?.role === "teacher" || user?.role === "instructor";

  // 1. إذا لم يكن مسجل دخول، توجيه لصفحة تسجيل الدخول
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. إذا كان أدمن، توجيه للوحة الأدمن
  if (user.role === "admin" || user.role === "super_admin") {
    return <Navigate to="/admin" replace />;
  }

  // 3. حماية مسار المدرس بناءً على حالة الحساب (status)
  if (isInstructor) {
    // إذا سجل ولم يكمل النموذج بعد
    if (user.status === "incomplete" || user.status === "pending_application") {
      return <Navigate to="/instructor/apply" replace />;
    }

    // إذا ملأ النموذج والطلب قيد المراجعة من الأدمن
    if (user.status === "pending") {
      return <Navigate to="/instructor/pending" replace />;
    }
  }

  // 4. إذا كان المدرس مقبولاً (active) أو كان طالباً، افتح Dashboard العادية
  return (
    <DashboardLayout
      sidebarLinks={isInstructor ? INSTRUCTOR_LINKS : STUDENT_LINKS}
      title={isInstructor ? "لوحة المدرس" : "لوحة الطالب"}
    >
      <Outlet />
    </DashboardLayout>
  );
}