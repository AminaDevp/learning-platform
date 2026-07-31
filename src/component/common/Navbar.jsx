import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  AcademicCapIcon,
  UserCircleIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import MobileDrawer from "./MobileDrawer";
import Button from "./Button";

const PUBLIC_LINKS = [
  { to: "/", label: "الرئيسية" },
  { to: "/courses", label: "الكورسات" },
  { to: "/about", label: "عن المنصة" },
  { to: "/contact", label: "اتصل بنا" },
];

// أيقونة ونص القائمة المنسدلة يختلفان حسب الدور
const ROLE_MENU = {
  student: {
    icon: UserCircleIcon,
    items: [
      { to: "/dashboard", label: "لوحة التحكم" },
      { to: "/dashboard/courses", label: "كورساتي" },
    ],
  },
  instructor: {
    icon: BookOpenIcon,
    items: [
      { to: "/instructor/dashboard", label: "لوحة التحكم" },
      { to: "/instructor/students", label: "طلابي" },
    ],
  },
  admin: {
    icon: Cog6ToothIcon,
    items: [
      { to: "/admin/courses", label: "إدارة الكورسات" },
      { to: "/admin/instructors", label: "المدرسين" },
      { to: "/admin/students", label: "الطلاب" },
      { to: "/admin/settings", label: "الإعدادات" },
    ],
  },
};

export default function Navbar() {
  const { role, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // تصغير الـ Navbar وتفعيل الخلفية شبه الشفافة عند التمرير
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // إغلاق القائمة المنسدلة عند الضغط خارجها
  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const roleConfig = ROLE_MENU[role];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur shadow-sm py-2"
            : "bg-white/60 py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4">
          {/* الشعار */}
          <Link to="/" className="flex items-center gap-2 text-gray-800">
            <AcademicCapIcon className="h-7 w-7 text-blue-600" />
            <span className="text-lg font-bold">أكاديمي</span>
          </Link>

          {/* روابط سطح المكتب */}
          <ul className="hidden items-center gap-6 md:flex">
            {PUBLIC_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive ? "text-blue-600" : "text-gray-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* منطقة الأزرار / حساب المستخدم */}
          <div className="hidden items-center gap-3 md:flex">
            {role === "guest" ? (
              <>
                <Link
                  to="/login"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-blue-600 hover:text-blue-600"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  سجل الآن
                </Link>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100"
                >
                  <roleConfig.icon className="h-6 w-6 text-blue-600" />
                  <span>{user?.name}</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {menuOpen && (
                  <div className="absolute end-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                    {roleConfig.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-start text-sm text-red-600 hover:bg-gray-50"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* زر القائمة للجوال */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg p-2 text-gray-800 hover:bg-gray-100 md:hidden"
            aria-label="فتح القائمة"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={PUBLIC_LINKS}
        roleConfig={roleConfig}
      />
    </>
  );
}