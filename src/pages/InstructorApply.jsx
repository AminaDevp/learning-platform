import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AcademicCapIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "../component/common/Button";
import Input from "../component/common/Input";
import { useAuth } from "../context/AuthContext";

export default function InstructorApply() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    specialty: "programming", // "programming" | "english"
    experienceYears: "",
    bio: "",
    certificates: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      // تحديث حالة حساب المدرس إلى pending
      const updatedUser = {
        ...user,
        status: "pending",
        applicationDetails: formData,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSubmitting(false);

      // التوجيه إلى شاشة الانتظار
      navigate("/instructor/pending");
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
            <AcademicCapIcon className="h-8 w-8" />
          </div>
          <h1 className="font-display text-2xl font-black text-slate-900">
            طلب الانضمام كـ مدرس
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            يرجى ملء النموذج أدناه ليتم مراجعته من قبل إدارة الأكاديمية
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* التخصص */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              التخصص الرئيسي
            </label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="programming">قسم البرمجة</option>
              <option value="english">قسم اللغة الإنجليزية</option>
            </select>
          </div>

          {/* سنوات الخبرة */}
          <Input
            label="سنوات الخبرة"
            name="experienceYears"
            type="number"
            required
            placeholder="مثال: 3"
            value={formData.experienceYears}
            onChange={handleChange}
          />

          {/* نبذة عن الخبرة والشهادات */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              سيرة ذاتية مختصرة
            </label>
            <textarea
              name="bio"
              required
              rows={3}
              placeholder="اكتب نبذة مختصرة عن مؤهلاتك وتجربتك في التدريس..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              الشهادات أو الروابط المرجعية (اختياري)
            </label>
            <Input
              name="certificates"
              placeholder="رابط LinkedIn / GitHub / معارض أعمالك"
              value={formData.certificates}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" loading={submitting} className="w-full py-3.5">
            <PaperAirplaneIcon className="h-5 w-5 ms-2 rotate-180 inline" />
            إرسال الطلب للمراجعة
          </Button>
        </form>
      </div>
    </div>
  );
}