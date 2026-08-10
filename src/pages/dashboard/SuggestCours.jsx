import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightBulbIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

export default function SuggestCourse() {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", category: "برمجة", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: استبدال بـ POST /api/instructor/suggestions حقيقي
    // (المدرس ما يقدر يضيف كورس مباشرة بنفسه — هذا اقتراح بس، والأدمن
    // هو اللي يقرر يحوّله لكورس فعلي أو لأ)
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  };

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-2">
        <LightBulbIcon className="h-6 w-6 text-accent" />
        <h1 className="font-display text-2xl font-bold text-gray-900">اقتراح كورس جديد</h1>
      </div>
      <p className="mt-1 text-gray-500">
        عندك فكرة كورس بيفيد الطلاب؟ اقترحها، والأدمن رح يراجعها ويقرر.
      </p>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
          >
            <CheckCircleIcon className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-3 font-display font-semibold text-primary">تم إرسال اقتراحك</p>
            <p className="mt-1 text-sm text-gray-500">
              الأدمن رح يراجعه ويعلمك بالقرار — ما تقدر تضيف الكورس بنفسك مباشرة.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSent(false);
                setForm({ title: "", category: "برمجة", reason: "" });
              }}
            >
              اقتراح كورس آخر
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4"
          >
            <Input
              label="اسم الكورس المقترح"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="مثال: TypeScript للمحترفين"
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">الفئة</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="برمجة">برمجة</option>
                <option value="إنجليزي">إنجليزي</option>
                <option value="مكس">مكس</option>
              </select>
            </div>

            <Input
              label="ليش هالكورس مفيد؟"
              name="reason"
              as="textarea"
              rows={4}
              value={form.reason}
              onChange={handleChange}
              required
              placeholder="اشرح باختصار سبب اقتراحك لهذا الكورس..."
            />

            <Button type="submit" loading={submitting} className="mt-2">
              إرسال الاقتراح
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}