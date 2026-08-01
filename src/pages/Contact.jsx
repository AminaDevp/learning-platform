import { useState } from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Input from "../component/common/Input";
import Button from "../component/common/Button";
 
// معلومات التواصل — placeholder، عدّلها ببيانات المشروع الفعلية
const CONTACT_INFO = [
  { icon: EnvelopeIcon, label: "info@academy.com" },
  { icon: PhoneIcon, label: "+216 00 000 000" },
  { icon: MapPinIcon, label: "تونس" },
];
 
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
 
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: استبدال بطلب API حقيقي (POST /api/contact) لما يجهزها الـ Backend
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  };
 
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold text-gray-900">اتصل بنا</h1>
        <p className="mx-auto mt-4 max-w-md text-gray-500">
          عندك سؤال أو اقتراح؟ راسلنا وبنرد عليك بأقرب وقت.
        </p>
      </div>
 
      <div className="mt-12 grid gap-10 md:grid-cols-5">
        {/* معلومات التواصل */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-5">
            {CONTACT_INFO.map((info) => (
              <div key={info.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-gray-700">{info.label}</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* النموذج */}
        <div className="md:col-span-3">
          {sent ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="font-display font-semibold text-primary">
                تم إرسال رسالتك بنجاح ✓
              </p>
              <p className="mt-1 text-sm text-gray-500">رح نرد عليك بأقرب وقت.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="الاسم"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="اسمك الكامل"
              />
              <Input
                label="البريد الإلكتروني"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />
              <Input
                label="الرسالة"
                name="message"
                as="textarea"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="اكتب رسالتك هنا..."
              />
 
              <Button type="submit" loading={submitting} className="mt-2">
                إرسال الرسالة
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}