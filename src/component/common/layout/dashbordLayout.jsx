import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

/**
 * Layout مشترك بين لوحة الطالب ولوحة المدرس.
 * المكون نفسه ما بيعرف شي عن الأدوار — بياخذ كل شي كـ props من الصفحة الأب،
 * يلي بتقرر القيم حسب role من useAuth(). هيك المكون قابل لإعادة الاستخدام 100%.
 *
 * مثال استخدام بـ App.jsx:
 *   <Route element={<DashboardLayout sidebarLinks={STUDENT_LINKS} title="لوحة الطالب" />}>
 *     <Route path="/dashboard" element={<StudentHome />} />
 *   </Route>
 */
export default function DashboardLayout({ sidebarLinks = [], title = "" }) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* الشريط الجانبي — ثابت بسطح المكتب، Drawer قابل للطي بالجوال */}
      <aside
        className={`fixed inset-y-0 start-0 z-30 w-64 transform border-e border-gray-100 bg-white transition-transform duration-300 md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <span className="font-display text-lg font-bold text-gray-800">{title}</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 hover:bg-gray-100 md:hidden"
            aria-label="إغلاق القائمة"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-100 p-4">
          <p className="mb-2 truncate text-sm font-medium text-gray-700">{user?.name}</p>
          <button
            onClick={logout}
            className="w-full rounded-lg px-3 py-2 text-start text-sm text-red-600 hover:bg-gray-50"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* خلفية مظللة خلف الـ Drawer بالجوال */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
        />
      )}

      {/* المحتوى الرئيسي */}
      <div className="flex flex-1 flex-col md:ms-64">
        <header className="flex items-center gap-3 border-b border-gray-100 bg-white p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 hover:bg-gray-100"
            aria-label="فتح القائمة"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <span className="font-display font-semibold text-gray-800">{title}</span>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}