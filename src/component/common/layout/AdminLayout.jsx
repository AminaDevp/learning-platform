import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  UsersIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/AuthContext";

const ADMIN_LINKS = [
  { to: "/admin/courses", label: "إدارة الكورسات", icon: BookOpenIcon },
  { to: "/admin/instructors", label: "المدرسين", icon: AcademicCapIcon },
  { to: "/admin/students", label: "الطلاب", icon: UsersIcon },
  { to: "/admin/settings", label: "الإعدادات", icon: Cog6ToothIcon },
  { to: "/admin/suggestions", label: "اقتراحات المدرسين", icon: LightBulbIcon },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50/60 font-sans text-slate-800 dir-rtl">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 z-30 flex w-64 flex-col bg-slate-900 text-white transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
          <Link to="/" className="flex items-center gap-2">
            <AcademicCapIcon className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold">أكاديمي</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 hover:bg-slate-800 md:hidden"
            aria-label="إغلاق القائمة"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <p className="px-6 pt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
          لوحة الإدارة
        </p>

        <nav className="flex flex-col gap-1.5 p-4">
          {ADMIN_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-800 p-4">
          <p className="mb-2 truncate text-sm font-semibold text-slate-200">{user?.name || "الأدمن"}</p>
          <button
            onClick={logout}
            className="w-full rounded-xl bg-red-500/10 px-3 py-2 text-start text-xs font-semibold text-red-400 hover:bg-red-500/20 transition"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Content Container */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 hover:bg-slate-100"
            aria-label="فتح القائمة"
          >
            <Bars3Icon className="h-6 w-6 text-slate-700" />
          </button>
          <span className="font-bold text-slate-800">لوحة الإدارة</span>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}