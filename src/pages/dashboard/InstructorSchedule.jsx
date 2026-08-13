import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  SparklesIcon,
  InformationCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/common/Button";
import { MOCK_SCHEDULE, AVAILABLE_REPLACEMENT_DAYS } from "../../utils/mockSchedule";

// إعداد شارات الحالة بألوان هادئة وعصرية متوافقة مع التصميم الداكن والأنماط الحديثة
const STATUS_STYLES = {
  scheduled: {
    label: "مجدولة",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-200/60",
    dotClass: "bg-emerald-500",
  },
  cancelled: {
    label: "ملغاة",
    badgeClass: "bg-rose-500/10 text-rose-600 border-rose-200/60",
    dotClass: "bg-rose-500",
  },
  rescheduled: {
    label: "تم التعويض",
    badgeClass: "bg-amber-500/10 text-amber-700 border-amber-200/60",
    dotClass: "bg-amber-500",
  },
};

export default function InstructorSchedule() {
  const [sessions, setSessions] = useState(MOCK_SCHEDULE);
  const [reschedulingId, setReschedulingId] = useState(null);
  const [pickedDay, setPickedDay] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // تبديل فتح/إغلاق منطقة اختيار يوم التعويض
  const openReschedule = (id) => {
    setReschedulingId(reschedulingId === id ? null : id);
    setPickedDay(null);
  };

  // تأكيد التعويض وتحديث الحالة في الواجهة
  const confirmReschedule = (id) => {
    if (!pickedDay) return;
    setSubmitting(true);

    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "rescheduled", originalDay: s.day, day: pickedDay }
            : s
        )
      );
      setSubmitting(false);
      setReschedulingId(null);
      setPickedDay(null);
    }, 700);
  };

  // إلغاء الحصة بدون تعويض
  const cancelReschedule = (id) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "cancelled" } : s))
    );
    setReschedulingId(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Banner Header العريض والتفاعلي */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <CalendarIcon className="h-6 w-6 text-indigo-300" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                جدول المحاضرات
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              إدارة وتنظيم جدولك الأكاديمي. يمكنك إعادة جدولة أي حصة أو تعويضها بيوم آخر متاح وسيقوم النظام بتنبيه الطلاب المسجلين تلقائياً.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md border border-white/10">
            <InformationCircleIcon className="h-5 w-5 text-indigo-300 shrink-0" />
            <span className="text-xs font-medium text-slate-200">
              التغييرات تُحدث فوراً لدى الطلاب
            </span>
          </div>
        </div>
      </div>

      {/* 2. قائمة الحصص الدراسية (Sessions Grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-900">
            الحصص القادمة ({sessions.length})
          </h2>
        </div>

        <div className="grid gap-4">
          {sessions.map((session) => {
            const statusConfig = STATUS_STYLES[session.status];
            const isRescheduling = reschedulingId === session.id;

            return (
              <motion.div
                layout
                key={session.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* معلومات الحصة والدورة */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 font-bold text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {session.courseTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                        {session.status === "rescheduled" ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400 line-through">
                              {session.originalDay}
                            </span>
                            <span className="text-amber-600 font-bold">← {session.day}</span>
                            <span>•</span>
                            <span className="text-slate-700">{session.time}</span>
                          </div>
                        ) : (
                          <span>
                            {session.day} • {session.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* الحالة والأزرار */}
                  <div className="flex items-center gap-3">
                    {/* شارة الحالة العصرية */}
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusConfig.badgeClass}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotClass}`}></span>
                      {statusConfig.label}
                    </span>

                    {/* زر الإلغاء والتعويض (يظهر للحصص المجدولة فقط) */}
                    {session.status === "scheduled" && (
                      <button
                        onClick={() => openReschedule(session.id)}
                        className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                          isRescheduling
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                        }`}
                      >
                        <ArrowPathIcon className="h-4 w-4" />
                        <span>{isRescheduling ? "إغلاق النافذة" : "تغيير أو تعويض"}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. منطقة اختيار يوم التعويض المنسدلة بأسلوب أنيق */}
                <AnimatePresence>
                  {isRescheduling && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-6 overflow-hidden border-t border-slate-100 pt-5 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-700">
                          اختر اليوم البديل المتاح:
                        </p>
                      </div>

                      {/* حبوب الأيام المتاحة (Replacement Days Pills) */}
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_REPLACEMENT_DAYS.map((day) => {
                          const isSelected = pickedDay === day;
                          return (
                            <button
                              key={day}
                              onClick={() => setPickedDay(day)}
                              className={`flex items-center gap-1.5 rounded-2xl border px-4 py-2 text-xs font-bold transition-all ${
                                isSelected
                                  ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                  : "border-slate-200/80 bg-slate-50 text-slate-600 hover:border-indigo-300 hover:bg-white hover:text-indigo-600"
                              }`}
                            >
                              {isSelected && <CheckIcon className="h-3.5 w-3.5 text-white" />}
                              <span>{day}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* الأزرار الإجرائية (Actions) */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button
                          size="sm"
                          onClick={() => confirmReschedule(session.id)}
                          loading={submitting}
                          disabled={!pickedDay}
                          className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-xs shadow-md shadow-indigo-600/20"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          <span>تأكيد اليوم البديل</span>
                        </Button>

                        <button
                          onClick={() => cancelReschedule(session.id)}
                          className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
                        >
                          <XCircleIcon className="h-4 w-4" />
                          <span>إلغاء الحصة بدون تعويض</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}