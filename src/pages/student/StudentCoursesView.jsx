import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpenIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { MOCK_COURSES } from "../../utils/mockCourses";
import Button from "../../component/common/Button";

export default function StudentCoursesView() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("admin_courses");
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // مزامنة الكورسات مع localStorage في حال تم تحديثها من قبل الأدمن
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("admin_courses");
      if (saved) setCourses(JSON.parse(saved));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // تصفية الكورسات حسب الفئة
  const filteredCourses = courses.filter((course) => {
    if (selectedCategory === "الكل") return true;
    return course.category === selectedCategory;
  });

  const handleConfirmEnrollment = (course, instructor) => {
    const enrollment = {
      id: Date.now(),
      courseTitle: course.title,
      category: course.category,
      instructorName: instructor.name,
      price: instructor.price,
      date: new Date().toLocaleDateString("ar-TN"),
    };

    setEnrolledCourses((prev) => [enrollment, ...prev]);
    setSelectedEnrollment(null);
    alert(`تم التسجيل بنجاح في كورس "${course.title}" مع الأستاذ ${instructor.name}!`);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* الهيدر وفلاتر البحث */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <AcademicCapIcon className="h-7 w-7 text-indigo-600" />
            الكورسات المتاحة
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            اختر الكورس والمدرس المناسب وابدأ رحلتك التعليمية.
          </p>
        </div>

        {/* فلاتر الفئات */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <FunnelIcon className="h-4 w-4 text-slate-500 mr-2" />
          {["الكل", "برمجة", "إنجليزي"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* بطاقات الكورسات */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 border border-indigo-100">
                  {course.category}
                </span>
                <BookOpenIcon className="h-5 w-5 text-slate-400" />
              </div>

              <h3 className="font-display text-lg font-bold text-slate-900">
                {course.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {course.description}
              </p>
            </div>

            {/* المدرسون والأسعار */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-400">المدرسون المتاحون:</h4>

              {course.instructors && course.instructors.length > 0 ? (
                <div className="space-y-2">
                  {course.instructors.map((inst) => (
                    <div
                      key={inst.id}
                      className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{inst.name}</span>
                        <span className="block text-slate-500 font-semibold">{inst.price}</span>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedEnrollment({ course, instructor: inst })
                        }
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 font-bold text-white hover:bg-indigo-700 transition"
                      >
                        حجز
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  لا يوجد مدرسون متاحون لهذا الكورس حالياً.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-400">
          لا توجد كورسات متاحة تحت هذه الفئة حالياً.
        </div>
      )}

      {/* نافذة تأكيد الحجز Modal */}
      <AnimatePresence>
        {selectedEnrollment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4"
            >
              <h3 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                تأكيد التسجيل في الكورس
              </h3>

              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  <strong className="text-slate-900">الكورس:</strong>{" "}
                  {selectedEnrollment.course.title}
                </p>
                <p>
                  <strong className="text-slate-900">الأستاذ:</strong>{" "}
                  {selectedEnrollment.instructor.name}
                </p>
                <p>
                  <strong className="text-slate-900">السعر المطلوبة:</strong>{" "}
                  <span className="text-indigo-600 font-bold">
                    {selectedEnrollment.instructor.price}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <Button
                  className="flex-1"
                  onClick={() =>
                    handleConfirmEnrollment(
                      selectedEnrollment.course,
                      selectedEnrollment.instructor
                    )
                  }
                >
                  تأكيد الحجز
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedEnrollment(null)}
                >
                  إلغاء
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}