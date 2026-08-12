import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  UserPlusIcon,
  AcademicCapIcon,
  SparklesIcon,
  TagIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { MOCK_APPLICATIONS } from "../../utils/mockApplications";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

export default function AdminInstructors() {
  const { department } = useAuth(); // "برمجة" | "إنجليزي" | "الكل" (Super Admin)
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const isSuperAdmin = department === "الكل";

  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    department: isSuperAdmin ? "برمجة" : department,
  });
  const [addedInstructors, setAddedInstructors] = useState([]);

  const handleAddInstructor = (e) => {
    e.preventDefault();
    if (!newInstructor.name.trim() || !newInstructor.email.trim()) return;

    setAddedInstructors((prev) => [
      { ...newInstructor, id: Date.now() },
      ...prev,
    ]);
    setNewInstructor({
      name: "",
      email: "",
      department: isSuperAdmin ? "برمجة" : department,
    });
    setShowAddForm(false);
  };

  const visibleApplications = isSuperAdmin
    ? applications
    : applications.filter((app) => app.department === department);

  const handleDecision = (id, decision) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: decision } : app))
    );
  };

  const pending = visibleApplications.filter((a) => a.status === "pending");
  const decided = visibleApplications.filter((a) => a.status !== "pending");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Top Action Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <AcademicCapIcon className="h-6 w-6 text-indigo-300" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                إدارة المدرسين {!isSuperAdmin && `— قسم ${department}`}
              </h1>
            </div>
            <p className="text-sm text-slate-300 max-w-xl">
              يمكنك إضافة حساب مدرس جديد معتمد فورياً، أو مراجعة والبت في طلبات الانضمام المقدمة.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="group flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-95"
          >
            <UserPlusIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>إضافة مدرس مباشرة</span>
          </button>
        </div>
      </div>

      {/* 2. Direct Add Form Modal/Panel */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            onSubmit={handleAddInstructor}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-indigo-600">
                <SparklesIcon className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-slate-900">
                  إنشاء حساب مدرس جديد (مفعل فوراً)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="اسم المدرس"
                name="name"
                placeholder="مثال: د. أحمد المنصوري"
                required
                value={newInstructor.name}
                onChange={(e) =>
                  setNewInstructor({ ...newInstructor, name: e.target.value })
                }
              />
              <Input
                label="البريد الإلكتروني"
                name="email"
                type="email"
                placeholder="instructor@example.com"
                required
                value={newInstructor.email}
                onChange={(e) =>
                  setNewInstructor({ ...newInstructor, email: e.target.value })
                }
              />
            </div>

            {isSuperAdmin && (
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  القسم الأكاديمي
                </label>
                <select
                  value={newInstructor.department}
                  onChange={(e) =>
                    setNewInstructor({
                      ...newInstructor,
                      department: e.target.value,
                    })
                  }
                  className="w-full sm:w-64 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 transition focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="برمجة">برمجة</option>
                  <option value="إنجليزي">إنجليزي</option>
                </select>
              </div>
            )}

            <p className="rounded-xl bg-amber-50 p-3 text-xs font-medium text-amber-800 border border-amber-200/60">
              💡 ملحوظة: سيتم إنشاء هذا الحساب فوراً بحالة <strong>نشط (Active)</strong> دون الحاجة إلى المرور بمرحلة المراجعة.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
                className="rounded-xl"
              >
                إلغاء
              </Button>
              <Button type="submit" size="sm" className="rounded-xl px-6">
                إنشاء الحساب
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* 3. Instructors Added Recently in Current Session */}
      {addedInstructors.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 block">
            المدرسون المضافون حديثاً خلال هذه الجلسة:
          </span>
          <div className="flex flex-wrap gap-2">
            {addedInstructors.map((inst) => (
              <span
                key={inst.id}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 border border-indigo-200/60 shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>{inst.name}</span>
                <span className="text-indigo-400">({inst.department})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Pending Applications Section */}
      <div className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            طلبات التقديم الجديدة {!isSuperAdmin && `— قسم ${department}`}
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">
            يرجى مراجعة بيانات المتقدمين واتخاذ قرار القبول أو الرفض.
          </p>
        </div>

        <div className="grid gap-4">
          <AnimatePresence>
            {pending.map((app) => {
              const isProgramming =
                app.department === "برمجة" || app.department === "programming";

              return (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg font-bold text-slate-900">
                          {app.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold ${
                            isProgramming
                              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                              : "bg-purple-50 text-purple-700 border border-purple-200/60"
                          }`}
                        >
                          <TagIcon className="h-3 w-3" />
                          {app.department}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                        <span>{app.email}</span>
                      </div>

                      {app.experience && (
                        <div className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
                          <BriefcaseIcon className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          <p className="leading-relaxed">{app.experience}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Decision Buttons */}
                    <div className="flex items-center gap-2 self-center">
                      <button
                        onClick={() => handleDecision(app.id, "active")}
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/30 active:scale-95"
                      >
                        <CheckIcon className="h-4 w-4 stroke-[2.5]" />
                        <span>قبول الطلب</span>
                      </button>
                      <button
                        onClick={() => handleDecision(app.id, "rejected")}
                        className="inline-flex items-center gap-1.5 rounded-2xl bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-100 active:scale-95"
                      >
                        <XMarkIcon className="h-4 w-4 stroke-[2.5]" />
                        <span>رفض</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {pending.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center text-slate-400 space-y-3">
              <ClockIcon className="h-10 w-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium">
                لا توجد طلبات تقديم معلقة في قائمة الانتظار حالياً.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 5. Decided Applications Log */}
      {decided.length > 0 && (
        <div className="pt-6 border-t border-slate-200/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-500">
            سجل الطلبات المعالجة سابقاً
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {decided.map((app) => {
              const isApproved = app.status === "active";
              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-xs border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{app.name}</span>
                    <span className="text-slate-400">({app.department})</span>
                  </div>
                  {isApproved ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/50">
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                      تم القبول
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200/50">
                      <XCircleIcon className="h-3.5 w-3.5" />
                      تم الرفض
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}