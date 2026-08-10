
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { MOCK_COURSES, getStartingPrice } from "../utils/mockCourses";
 
const FILTERS = ["الكل", "برمجة", "إنجليزي", "مكس"];
 
export default function Courses() {
  const [activeFilter, setActiveFilter] = useState("الكل");
 
  const filtered =
    activeFilter === "الكل"
      ? MOCK_COURSES
      : MOCK_COURSES.filter((c) => c.category === activeFilter);
 
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold text-gray-900">الكورسات</h1>
        <p className="mt-3 text-gray-500">اختر الكورس المناسب لك، وشوف المدرسين المتاحين له.</p>
      </div>
 
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === f
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
 
      {/* بطاقة الكورس: بدون اسم مدرس — بس عدد المدرسين المتاحين وأقل سعر */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary to-secondary">
              <span className="font-display text-sm font-semibold text-white/90">
                {course.category}
              </span>
            </div>
 
            <div className="p-5">
              <h3 className="font-display font-semibold text-gray-900">{course.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{course.description}</p>
 
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <UserGroupIcon className="h-4 w-4 text-secondary" />
                  <span>{course.instructors.length} مدرسين متاحين</span>
                </div>
                <span className="font-display text-sm font-bold text-primary">
                  يبدأ من {getStartingPrice(course)} د.ت
                </span>
              </div>
 
              <Link
                to={`/courses/${course.id}`}
                className="mt-4 block rounded-lg bg-primary py-2 text-center text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                عرض التفاصيل والمدرسين
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
 
      {filtered.length === 0 && (
        <p className="mt-16 text-center text-gray-400">لا توجد كورسات بهذه الفئة حالياً.</p>
      )}
    </section>
  );
}
 