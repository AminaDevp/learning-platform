import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ArrowRightOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/AuthContext";

export default function DashboardLayout({ sidebarLinks, title, children }) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Map route links to visual icons dynamically
  const getNavIcon = (path) => {
    if (path.endsWith("/courses")) return <AcademicCapIcon className="h-5 w-5" />;
    if (path.endsWith("/students")) return <UserGroupIcon className="h-5 w-5" />;
    if (path.endsWith("/schedule")) return <CalendarIcon className="h-5 w-5" />;
    return <HomeIcon className="h-5 w-5" />;
  };

  return (
    <div className="flex min-h-screen bg-slate-50/60 font-sans text-slate-800 dir-rtl">
      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed inset-y-0 start-0 z-30 flex w-72 flex-col border-e border-slate-200/80 bg-white shadow-sm transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold text-lg">
              L
            </div>
            <div>
              <h2 className="font-bold text-slate-900 leading-tight">منصة التعلم</h2>
              <span className="text-xs text-slate-400 font-medium">{title}</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 md:hidden"
            aria-label="إغلاق القائمة"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-4 py-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            القائمة الرئيسية
          </p>
          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`
                }
              >
                {getNavIcon(link.to)}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">{user?.name || "المستخدم"}</p>
              <p className="truncate text-xs text-slate-400 capitalize">{user?.role || "طالب"}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50/50 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-200"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-4 md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <span className="font-bold text-slate-800">{title}</span>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}