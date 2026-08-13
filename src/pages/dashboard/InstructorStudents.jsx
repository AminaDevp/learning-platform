import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { MOCK_STUDENTS } from "../../utils/mockStudents";

export default function InstructorStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students] = useState(MOCK_STUDENTS || []);

  // تصفية الطلاب حسب اسم الطالب أو عنوان الكورس
  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Header Banner الداكن والعصري */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <UserGroupIcon className="h-6 w-6 text-indigo-300" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  قائمة طلابي
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  متابعة الطلاب المسجلين حالياً في دوراتك الأكاديمية ونسبة تقدمهم الدراسي.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md border border-white/10">
            <AcademicCapIcon className="h-5 w-5 text-indigo-300 shrink-0" />
            <span className="text-xs font-bold text-slate-200">
              إجمالي الطلاب: {students.length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. شريط البحث والتصفية السريعة */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث باسم الطالب أو اسم الكورس..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-11 pl-4 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* 3. شبكة عرض الطلاب (Students Grid) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <AnimatePresence>
          {filteredStudents.map((student) => {
            const isCompleted = student.progress === 100;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                key={student.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* معلومات الطالب الأساسية */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 font-display text-lg font-bold text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                      {student.name ? student.name.charAt(0) : "S"}
                    </div>

                    <div className="space-y-1 overflow-hidden">
                      <h3 className="font-display text-base font-bold text-slate-900 truncate">
                        {student.name}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 truncate">
                        {student.courseTitle}
                      </p>
                    </div>
                  </div>

                  {/* شريط التقدم الدراسي المطور */}
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">نسبة الإنجاز</span>
                      <span
                        className={
                          isCompleted ? "text-emerald-600" : "text-indigo-600"
                        }
                      >
                        {student.progress}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${student.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full transition-all ${
                          isCompleted
                            ? "bg-emerald-500"
                            : "bg-gradient-to-r from-indigo-500 to-indigo-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* تذييل البطاقة */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-400">
                  <span>حالة الاشتراك: نشط</span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <SparklesIcon className="h-3.5 w-3.5" /> أتم الكورس
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* الحالة الفارغة (Empty State) */}
      {filteredStudents.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center text-slate-400 space-y-3">
          <InboxIcon className="h-10 w-10 mx-auto text-slate-300" />
          <p className="text-sm font-medium">
            لا يوجد طلاب مطابقين لنتائج البحث حالياً.
          </p>
        </div>
      )}
    </div>
  );
}