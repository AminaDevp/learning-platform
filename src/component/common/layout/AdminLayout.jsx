import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  UsersIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

// روابط ثابتة خاصة بالأدمن فقط — مو props زي DashboardLayout، لأن
// AdminLayout مبني لصفحة أدمن واحدة فقط، مش مشترك بين أدوار مختلفة
const ADMIN_LINKS = [
  { to: "/admin/courses", label: "إدارة الكورسات", icon: BookOpenIcon },
  { to: "/admin/instructors", label: "المدرسين", icon: AcademicCapIcon },
  { to: "/admin/students", label: "الطلاب", icon: UsersIcon },
  { to: "/admin/settings", label: "الإعدادات", icon: Cog6ToothIcon },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar كحلي غامق — يميّز لوحة الأدمن بصرياً عن DashboardLayout الفاتح */}
      <aside
        className={`fixed inset-y-0 start-0 z-30 w-64 transform bg-primary text-white transition-transform duration-300 md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <Link to="/" className="flex items-center gap-2">
            <AcademicCapIcon className="h-6 w-6 text-accent" />
            <span className="font-display text-lg font-bold">أكاديمي</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 hover:bg-white/10 md:hidden"
            aria-label="إغلاق القائمة"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-white/50">
          لوحة الإدارة
        </p>

        <nav className="flex flex-col gap-1 p-4">
          {ADMIN_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-accent text-primary"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 p-4">
          <p className="mb-2 truncate text-sm font-medium text-white/90">{user?.name}</p>
          <button
            onClick={logout}
            className="w-full rounded-lg px-3 py-2 text-start text-sm text-red-300 hover:bg-white/10"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
        />
      )}

      <div className="flex flex-1 flex-col md:ms-64">
        <header className="flex items-center gap-3 border-b border-gray-100 bg-white p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 hover:bg-gray-100"
            aria-label="فتح القائمة"
          >
            <Bars3Icon className="h-6 w-6 text-primary" />
          </button>
          <span className="font-display font-semibold text-gray-800">لوحة الإدارة</span>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}