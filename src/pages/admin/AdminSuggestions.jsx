import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  LightBulbIcon,
  TagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  InboxIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

// بيانات افتراضية تجريبية في حال لم تُمرّر Props
const DEFAULT_SUGGESTIONS = [
  {
    id: 101,
    title: "تطوير تطبيقات الهاتف باستخدام React Native",
    description: "اقتراح كورس شاملاً لربط واجهات React Native مع Firebase وإنشاء تطبيقات متكاملة.",
    category: "برمجة",
    status: "pending",
  },
  {
    id: 102,
    title: "محادثات الأعمال المتقدمة - Business English",
    description: "كورس مخصص لإتقان كتابة الإيميلات وتسيير الاجتماعات باللغة الإنجليزية للشركات.",
    category: "إنجليزي",
    status: "pending",
  },
];

export default function AdminSuggestions({
  suggestions = DEFAULT_SUGGESTIONS,
  setSuggestions,
}) {
  const [localSuggestions, setLocalSuggestions] = useState(suggestions);
  const [activeTab, setActiveTab] = useState("all");

  // مزامنة القائمة المحلية مع الـ Props أو LocalStorage
  useEffect(() => {
    if (setSuggestions) {
      setLocalSuggestions(suggestions);
    } else {
      const saved = localStorage.getItem("admin_suggestions_list");
      if (saved) setLocalSuggestions(JSON.parse(saved));
    }
  }, [suggestions, setSuggestions]);

  const updateSuggestionsState = (newList) => {
    setLocalSuggestions(newList);
    if (setSuggestions) {
      setSuggestions(newList);
    } else {
      localStorage.setItem("admin_suggestions_list", JSON.stringify(newList));
    }
  };

  const handleApprove = (suggestion) => {
    // 1. جلب الكورسات الحالية من localStorage
    const existingCourses =
      JSON.parse(localStorage.getItem("admin_courses")) || [];

    // 2. إنشاء كائن الكورس الجديد بناءً على الاقتراح المقبول
    const newCourseFromSuggestion = {
      id: Date.now(),
      title: suggestion.title,
      description: suggestion.description,
      category: suggestion.category,
      instructors: [],
      createdAt: new Date().toISOString(),
    };

    // 3. حفظ الكورس الجديد في localStorage
    const updatedCourses = [newCourseFromSuggestion, ...existingCourses];
    localStorage.setItem("admin_courses", JSON.stringify(updatedCourses));

    // 4. تحديث حالة الاقتراحات إلى approved
    const updatedSuggestions = localSuggestions.map((item) =>
      item.id === suggestion.id ? { ...item, status: "approved" } : item
    );

    updateSuggestionsState(updatedSuggestions);

    // إطلاق حدث للتحديث الفوري عبر المكونات
    window.dispatchEvent(new Event("storage"));
  };

  const handleReject = (id) => {
    const updatedSuggestions = localSuggestions.map((item) =>
      item.id === id ? { ...item, status: "rejected" } : item
    );
    updateSuggestionsState(updatedSuggestions);
  };

  // تصفية القائمة
  const filteredSuggestions = localSuggestions.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  // حساب الإحصائيات السريعة
  const stats = {
    total: localSuggestions.length,
    pending: localSuggestions.filter((s) => s.status === "pending").length,
    approved: localSuggestions.filter((s) => s.status === "approved").length,
    rejected: localSuggestions.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Modern Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <LightBulbIcon className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  اقتراحات الكورسات المقدمة
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  مراجعة اقتراحات المناهج الجديدة وتحويل المقبول منها إلى كورس رسمي بضغطة زر.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md text-center">
              <span className="block text-xs text-slate-300">قيد الانتظار</span>
              <span className="font-display text-lg font-bold text-amber-300">
                {stats.pending}
              </span>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md text-center">
              <span className="block text-xs text-slate-300">تم قبولها</span>
              <span className="font-display text-lg font-bold text-emerald-300">
                {stats.approved}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter Navigation Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: `الكل (${stats.total})` },
            { id: "pending", label: `قيد المراجعة (${stats.pending})` },
            { id: "approved", label: `المقبولة (${stats.approved})` },
            { id: "rejected", label: `المرفوضة (${stats.rejected})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Suggestions List Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <AnimatePresence>
          {filteredSuggestions.map((suggestion) => {
            const isProgramming =
              suggestion.category === "برمجة" ||
              suggestion.category === "programming";
            const isPending = suggestion.status === "pending";
            const isApproved = suggestion.status === "approved";

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                key={suggestion.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Top Category Badge & Title */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {suggestion.title}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                        isProgramming
                          ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                          : "bg-purple-50 text-purple-700 border border-purple-200/60"
                      }`}
                    >
                      <TagIcon className="h-3.5 w-3.5" />
                      {suggestion.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-slate-600">
                    {suggestion.description}
                  </p>
                </div>

                {/* Footer Controls & Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  {isPending ? (
                    <div className="flex items-center gap-2 w-full justify-end">
                      <button
                        onClick={() => handleReject(suggestion.id)}
                        className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/50 px-3.5 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-100 hover:text-rose-700"
                      >
                        <XMarkIcon className="h-4 w-4" />
                        <span>رفض</span>
                      </button>

                      <button
                        onClick={() => handleApprove(suggestion)}
                        className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-95"
                      >
                        <SparklesIcon className="h-4 w-4 text-amber-300" />
                        <span>قبول وتحويل لكورس</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-slate-400 font-medium">
                        الحالة الحالية
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                          isApproved
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {isApproved ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                            تم القبول وإضافته للكورسات
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="h-4 w-4 text-rose-600" />
                            تم رفض الاقتراح
                          </>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredSuggestions.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center text-slate-400 space-y-3">
          <InboxIcon className="h-10 w-10 mx-auto text-slate-300" />
          <p className="text-sm font-medium">
            لا توجد أي اقتراحات مسجلة في هذه الفئة حالياً.
          </p>
        </div>
      )}
    </div>
  );
}