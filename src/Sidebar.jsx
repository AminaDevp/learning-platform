import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  UserGroupIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "الكورسات", path: "/admin/courses", icon: BookOpenIcon },
  { name: "المدرسون", path: "/admin/instructors", icon: AcademicCapIcon },
  { name: "الطلاب", path: "/admin/students", icon: UserGroupIcon },
  { name: "الإعدادات", path: "/admin/settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <nav className="space-y-1 p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}