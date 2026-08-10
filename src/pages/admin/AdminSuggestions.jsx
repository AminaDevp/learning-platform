import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightBulbIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { MOCK_SUGGESTIONS } from "../../utils/Mocksuggestions ";

export default function AdminSuggestions() {
  const { department } = useAuth();
  const isSuperAdmin = department === "الكل";
  const [suggestions, setSuggestions] = useState(MOCK_SUGGESTIONS);

  const visible = isSuperAdmin
    ? suggestions
    : suggestions.filter((s) => s.category === department);

  const pending = visible.filter((s) => s.status === "pending");

  const handleDecision = (id, decision) => {
    // TODO: عند "تحويل لكورس" — استبدال بـ POST /api/admin/courses حقيقي
    // مبني على بيانات الاقتراح (نفس منطق AdminCourses.jsx لإضافة كورس)
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: decision } : s))
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <LightBulbIcon className="h-6 w-6 text-accent" />
        <h1 className="font-display text-2xl font-bold text-gray-900">
          اقتراحات المدرسين {!isSuperAdmin && `— قسم ${department}`}
        </h1>
      </div>
      <p className="mt-1 text-gray-500">راجع أفكار كورسات جديدة من المدرسين، وحوّلها لكورس أو ارفضها.</p>

      <div className="mt-8 flex flex-col gap-4">
        <AnimatePresence>
          {pending.map((s) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-semibold text-gray-900">{s.title}</p>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                      {s.category}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-400">مقترح من: {s.instructorName}</p>
                  <p className="mt-2 max-w-lg text-sm text-gray-600">{s.reason}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(s.id, "approved")}
                    className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                  >
                    <CheckIcon className="h-4 w-4" />
                    تحويل لكورس
                  </button>
                  <button
                    onClick={() => handleDecision(s.id, "rejected")}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <XMarkIcon className="h-4 w-4" />
                    رفض
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {pending.length === 0 && (
          <p className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400">
            لا توجد اقتراحات معلقة حالياً
          </p>
        )}
      </div>
    </div>
  );
}