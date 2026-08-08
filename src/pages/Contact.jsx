import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";
import Input from "../component/common/Input";
import Button from "../component/common/Button";

const CONTACT_INFO = [
  { 
    icon: EnvelopeIcon, 
    title: "البريد الإلكتروني", 
    value: "info@academy.com", 
    subtitle: "فريقنا متواجد للرد على كافة الاستفسارات" 
  },
  { 
    icon: PhoneIcon, 
    title: "الهاتف المباشر", 
    value: "+216 71 000 000", 
    subtitle: "من الإثنين إلى الجمعة (09:00 - 18:00)" 
  },
  { 
    icon: MapPinIcon, 
    title: "المقر الرئيسي", 
    value: "تونس العاصمة، تونس", 
    subtitle: "شارع الحبيب بورقيبة، المركز التكنولوجي" 
  },
];

const SUBJECT_OPTIONS = [
  "استفسار عام",
  "التسجيل في الكورسات",
  "الدعم الفني",
  "الانضمام كمدرس",
];

export default function Contact() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    subject: "استفسار عام", 
    message: "" 
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubjectSelect = (subj) => {
    setForm((prev) => ({ ...prev, subject: subj }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Connect to backend API (POST /api/contact)
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-100 py-12 font-sans">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center text-white shadow-2xl sm:p-12">
          <div className="relative z-10 mx-auto max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-3.5 py-1 text-xs font-semibold text-blue-400 backdrop-blur-xl">
              <SparklesIcon className="h-4 w-4 text-blue-400" />
              نحن هنا لخدمتك
            </span>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              تواصل مع فريق الأكاديمية
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              يسعدنا استلام استفساراتك واقتراحاتك. اختر موضوع الرسالة وسيقوم فريقنا بالرد عليك خلال أقل من 24 ساعة.
            </p>
          </div>

          {/* Ambient Lighting Background */}
          <div className="absolute -top-32 -end-32 h-72 w-72 rounded-full bg-blue-600/25 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -start-32 h-72 w-72 rounded-full bg-indigo-600/25 blur-[100px] pointer-events-none" />
        </div>

        {/* Content Layout Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column: Direct Info Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-6 border-b border-slate-100 pb-4">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600" />
                <h2>معلومات الاتصال المباشر</h2>
              </div>

              <div className="space-y-6">
                {CONTACT_INFO.map((item) => (
                  <div key={item.title} className="group flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition group-hover:bg-blue-600 group-hover:text-white">
                      <item.icon className="h-5 w-5 transition" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400">{item.title}</h3>
                      <p className="text-sm font-extrabold text-slate-900 dir-ltr text-right mt-0.5">{item.value}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours Badge */}
              <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200/70 p-4 flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">ساعات الدعم الفني</span>
                  <span className="text-slate-500 text-[11px]">متاحون طيلة أيام الأسبوع لمتابعة الطلاب</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                      <CheckCircleIcon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">تم استلام رسالتك بنجاح!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      شكراً لتواصلك معنا. قام نظامنا بتوجيه رسالتك للقسم المختص وسنرد عليك عبر البريد الإلكتروني في أقرب وقت ممكن.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "استفسار عام", message: "" }); }}
                      className="mt-4 rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">أرسل لنا رسالة</h3>
                      <p className="text-xs text-slate-500 mt-1">يرجى ملء كافة البيانات التالية بشكل صحيح.</p>
                    </div>

                    {/* Subject Pill Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">موضوع الرسالة</label>
                      <div className="flex flex-wrap gap-2">
                        {SUBJECT_OPTIONS.map((subj) => (
                          <button
                            type="button"
                            key={subj}
                            onClick={() => handleSubjectSelect(subj)}
                            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                              form.subject === subj
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {subj}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Input
                          label="الاسم الكامل"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="مثال: كريم بن علي"
                        />
                      </div>
                      <div>
                        <Input
                          label="البريد الإلكتروني"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Input
                        label="نص الرسالة"
                        name="message"
                        as="textarea"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="اكتب كافة التفاصيل التي ترغب في استفسار عنها هنا..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      loading={submitting} 
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-blue-600 shadow-lg shadow-slate-900/10"
                    >
                      <PaperAirplaneIcon className="h-4 w-4 rotate-180" />
                      <span>إرسال الرسالة الآن</span>
                    </Button>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}