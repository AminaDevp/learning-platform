import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  UserPlusIcon,
  XMarkIcon,
  AcademicCapIcon,
  SparklesIcon,
  TagIcon,
  EnvelopeIcon,
  PhoneIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

// MOCK DATA لتمثيل قائمة الطلاب
const MOCK_STUDENTS = [
  {
    id: 1,
    name: "سارة العلوي",
    email: "sara@example.com",
    phone: "21698123456",
    department: "برمجة",
    enrolledCourse: "احترف React.js من الصفر",
    status: "active",
  },
  {
    id: 2,
    name: "محمد التونسي",
    email: "mohamed@example.com",
    phone: "21695654321",
    department: "إنجليزي",
    enrolledCourse: "English Conversation B2",
    status: "active",
  },
];

export default function AdminStudents() {
  const { user, department: authDept } = useAuth();
  const userDepartment = authDept || user?.department || "all";
  const isSuperAdmin =
    userDepartment === "all" ||
    userDepartment === "الكل" ||
    user?.role === "super_admin";

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("admin_students");
    return saved ? JSON.parse(saved) : MOCK_STUDENTS;
  });

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    department: isSuperAdmin ? "برمجة" : userDepartment,
    enrolledCourse: "",
  });

  useEffect(() => {
    setNewStudent((prev) => ({
      ...prev,
      department: isSuperAdmin ? "برمجة" : userDepartment,
    }));
  }, [userDepartment, isSuperAdmin]);

  useEffect(() => {
    localStorage.setItem("admin_students", JSON.stringify(students));
  }, [students]);

  const visibleStudents = students.filter((s) => {
    if (isSuperAdmin) return true;
    const cat = s.department?.toString().toLowerCase().trim();
    const dept = userDepartment?.toString().toLowerCase().trim();

    if (dept === "english" || dept === "إنجليزي") {
      return cat === "english" || cat === "إنجليزي";
    }
    if (dept === "programming" || dept === "برمجة") {
      return cat === "programming" || cat === "برمجة";
    }
    return cat === dept;
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim() || !newStudent.email.trim()) return;

    const student = {
      id: Date.now(),
      ...newStudent,
      department: isSuperAdmin ? newStudent.department : userDepartment,
      status: "active",
    };

    setStudents((prev) => [student, ...prev]);
    setNewStudent({
      name: "",
      email: "",
      phone: "",
      department: isSuperAdmin ? "برمجة" : userDepartment,
      enrolledCourse: "",
    });
    setShowAddStudent(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Top Action Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <UserGroupIcon className="h-6 w-6 text-indigo-300" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                إدارة الطلاب {!isSuperAdmin && `— قسم ${userDepartment}`}
              </h1>
            </div>
            <p className="text-sm text-slate-300 max-w-xl">
              عرض وحفظ بيانات الطلاب المسجلين، تسجيل طلاب جديد بصفة مباشرة ومتابعة الدورات المسجلين بها.
            </p>
          </div>

          <button
            onClick={() => setShowAddStudent((v) => !v)}
            className="group flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-95"
          >
            <UserPlusIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>تسجيل طالب جديد</span>
          </button>
        </div>
      </div>

      {/* 2. Add Student Modal / Form Panel */}
      <AnimatePresence>
        {showAddStudent && (
          <motion.form
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            onSubmit={handleAddStudent}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-600">
                <SparklesIcon className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-slate-900">
                  تسجيل طالب جديد في النظام
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddStudent(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="اسم الطالب الثلاثي"
                name="name"
                placeholder="مثال: ياسمين بن مبروك"
                required
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <Input
                label="البريد الإلكتروني"
                name="email"
                type="email"
                placeholder="student@example.com"
                required
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <Input
                label="رقم الهاتف"
                name="phone"
                placeholder="216XXXXXXXX"
                value={newStudent.phone}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, phone: e.target.value })
                }
              />

              <Input
                label="الكورس المسجل به"
                name="enrolledCourse"
                placeholder="مثال: كورس React أو English B1"
                value={newStudent.enrolledCourse}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, enrolledCourse: e.target.value })
                }
              />

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  القسم الأكاديمي
                </label>
                {isSuperAdmin ? (
                  <select
                    value={newStudent.department}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, department: e.target.value })
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

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddStudent(false)}
                className="rounded-xl"
              >
                إلغاء
              </Button>
              <Button type="submit" size="sm" className="rounded-xl px-6">
                إضافة الطالب
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 3. Student Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">
            قائمة الطلاب المسجلين ({visibleStudents.length})
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {visibleStudents.map((student) => {
            const isProgramming =
              student.department === "برمجة" ||
              student.department === "programming";

            return (
              <motion.div
                layout
                key={student.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-4 h-full">
                  <div className="space-y-3">
                    {/* Top Row: Name and Department Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-700">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {student.name}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <CheckCircleIcon className="h-3 w-3" />
                            حساب نشط
                          </span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                          isProgramming
                            ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                            : "bg-purple-50 text-purple-700 border border-purple-200/60"
                        }`}
                      >
                        <TagIcon className="h-3.5 w-3.5" />
                        {student.department}
                      </span>
                    </div>

                    {/* Contact Info Details */}
                    <div className="space-y-2 pt-2 text-xs font-medium text-slate-500 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                        <span>{student.email}</span>
                      </div>
                      {student.phone && (
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-slate-400" />
                          <span dir="ltr">{student.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enrolled Course Footer Tag */}
                  {student.enrolledCourse && (
                    <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-700 border border-slate-100">
                      <BookOpenIcon className="h-4 w-4 text-indigo-500 shrink-0" />
                      <span className="truncate">{student.enrolledCourse}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {visibleStudents.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center text-slate-400 space-y-3">
            <AcademicCapIcon className="h-10 w-10 mx-auto text-slate-300" />
            <p className="text-sm font-medium">
              لا يوجد طلاب مسجلون في هذا القسم حالياً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}