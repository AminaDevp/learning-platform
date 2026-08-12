import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  UserPlusIcon,
  XMarkIcon,
  BookOpenIcon,
  TrashIcon,
  AcademicCapIcon,
  TagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { MOCK_COURSES } from "../../utils/mockCourses";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

export default function AdminCourses() {
  const { user, department: authDept } = useAuth();
  const userDepartment = authDept || user?.department || "all";
  const isSuperAdmin =
    userDepartment === "all" ||
    userDepartment === "الكل" ||
    user?.role === "super_admin";

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("admin_courses");
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: isSuperAdmin ? "برمجة" : userDepartment,
  });

  const [assigningTo, setAssigningTo] = useState(null);
  const [newInstructor, setNewInstructor] = useState({ name: "", price: "" });

  useEffect(() => {
    setNewCourse((prev) => ({
      ...prev,
      category: isSuperAdmin ? "برمجة" : userDepartment,
    }));
  }, [userDepartment, isSuperAdmin]);

  useEffect(() => {
    localStorage.setItem("admin_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("admin_courses");
      if (saved) {
        setCourses(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const visibleCourses = courses.filter((c) => {
    if (isSuperAdmin) return true;
    const cat = c.category?.toString().toLowerCase().trim();
    const dept = userDepartment?.toString().toLowerCase().trim();

    if (dept === "english" || dept === "إنجليزي") {
      return cat === "english" || cat === "إنجليزي";
    }
    if (dept === "programming" || dept === "برمجة") {
      return cat === "programming" || cat === "برمجة";
    }
    return cat === dept;
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim() || !newCourse.description.trim()) return;

    const course = {
      id: Date.now(),
      title: newCourse.title,
      description: newCourse.description,
      category: isSuperAdmin ? newCourse.category : userDepartment,
      instructors: [],
    };

    setCourses((prev) => [course, ...prev]);
    setNewCourse({
      title: "",
      description: "",
      category: isSuperAdmin ? "برمجة" : userDepartment,
    });
    setShowAddCourse(false);
  };

  const handleAssignInstructor = (courseId) => {
    if (!newInstructor.name.trim() || !newInstructor.price.trim()) return;

    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              instructors: [
                ...(c.instructors || []),
                {
                  id: Date.now(),
                  name: newInstructor.name,
                  price: `${newInstructor.price} د.ت`,
                },
              ],
            }
          : c
      )
    );
    setNewInstructor({ name: "", price: "" });
    setAssigningTo(null);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الكورس؟")) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Quick Actions */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <BookOpenIcon className="h-6 w-6 text-indigo-300" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                إدارة الكورسات {!isSuperAdmin && `— قسم ${userDepartment}`}
              </h1>
            </div>
            <p className="text-sm text-slate-300 max-w-xl">
              قم بإنشاء وتحديث الكورسات التعليمية وتعيين نخبة المدرسين المعتمدين لكل دورة.
            </p>
          </div>

          <button
            onClick={() => setShowAddCourse((v) => !v)}
            className="group flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-95"
          >
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-90" />
            <span>إضافة كورس جديد</span>
          </button>
        </div>
      </div>

      {/* 2. Add Course Form Modal */}
      <AnimatePresence>
        {showAddCourse && (
          <motion.form
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            onSubmit={handleAddCourse}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-600">
                <SparklesIcon className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-slate-900">
                  إضافة كورس تعليمي جديد
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="عنوان الكورس"
                name="title"
                placeholder="مثال: احترف React.js من الصفر"
                required
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  الفئة / القسم
                </label>
                {isSuperAdmin ? (
                  <select
                    value={newCourse.category}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, category: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  >
                    <option value="برمجة">برمجة</option>
                    <option value="إنجليزي">إنجليزي</option>
                  </select>
                ) : (
                  <input
                    disabled
                    value={userDepartment}
                    className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-500 outline-none"
                  />
                )}
              </div>
            </div>

            <Input
              label="تفاصيل ووصف الكورس"
              name="description"
              as="textarea"
              rows={3}
              placeholder="اكتب وصفاً شاملاً عن محتوى الدورة والمهارات المكتسبة..."
              required
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddCourse(false)}
                className="rounded-xl"
              >
                إلغاء
              </Button>
              <Button type="submit" size="sm" className="rounded-xl px-6">
                حفظ ونشر الكورس
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 3. Courses List */}
      <div className="grid gap-6">
        {visibleCourses.map((course) => {
          const isProgramming =
            course.category === "برمجة" || course.category === "programming";

          return (
            <motion.div
              layout
              key={course.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-5">
                {/* Header Row */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                          isProgramming
                            ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                            : "bg-purple-50 text-purple-700 border border-purple-200/60"
                        }`}
                      >
                        <TagIcon className="h-3.5 w-3.5" />
                        {course.category}
                      </span>
                      <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                      {course.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setAssigningTo(
                          assigningTo === course.id ? null : course.id
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95"
                    >
                      <UserPlusIcon className="h-4 w-4" />
                      <span>تعيين مدرس</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="rounded-xl bg-slate-100 p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      title="حذف الكورس"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Instructors Section */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 pl-2">
                    <AcademicCapIcon className="h-4 w-4 text-slate-500" />
                    المدرسون المتاحون:
                  </span>
                  {course.instructors && course.instructors.length > 0 ? (
                    course.instructors.map((inst) => (
                      <span
                        key={inst.id}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200/60 shadow-sm"
                      >
                        <span>{inst.name}</span>
                        <span className="h-1 w-1 rounded-full bg-emerald-400"></span>
                        <span className="text-emerald-600">{inst.price}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-medium text-slate-400 italic">
                      لم يتم تعيين مدرسين بعد
                    </span>
                  )}
                </div>

                {/* Assign Instructor Inline Form */}
                <AnimatePresence>
                  {assigningTo === course.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 rounded-2xl bg-slate-50 p-4 border border-slate-200/60 space-y-3">
                        <span className="text-xs font-bold text-slate-700 block">
                          إضافة مدرس لهذا الكورس:
                        </span>
                        <div className="flex flex-wrap items-end gap-3">
                          <Input
                            label="اسم المدرس"
                            name="instName"
                            placeholder="مثال: أستاذ أحمد"
                            value={newInstructor.name}
                            onChange={(e) =>
                              setNewInstructor({
                                ...newInstructor,
                                name: e.target.value,
                              })
                            }
                            className="flex-1 min-w-[200px]"
                          />
                          <Input
                            label="السعر (د.ت)"
                            name="instPrice"
                            type="number"
                            placeholder="25"
                            value={newInstructor.price}
                            onChange={(e) =>
                              setNewInstructor({
                                ...newInstructor,
                                price: e.target.value,
                              })
                            }
                            className="w-32"
                          />
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="rounded-xl px-4"
                              onClick={() => handleAssignInstructor(course.id)}
                            >
                              إضافة
                            </Button>
                            <button
                              onClick={() => setAssigningTo(null)}
                              className="rounded-xl p-2 text-slate-400 hover:bg-slate-200/60"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}

        {visibleCourses.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center text-slate-400 space-y-3">
            <BookOpenIcon className="h-10 w-10 mx-auto text-slate-300" />
            <p className="text-sm font-medium">
              لا توجد كورسات مضافة في هذا القسم حالياً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}