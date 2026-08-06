 import { useState } from "react";
 import { useNavigate ,Link} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "../component/common/Button";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [role, setRole] = useState("student"); // "student" | "teacher"
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. Store user state with selected role
    setUser({
      name: formData.name,
      email: formData.email,
      role: role,
    });

    // 2. Navigate to dashboard after submission
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* ---------------- LEFT SIDE: VISUAL BANNER ---------------- */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-12 text-white lg:flex">
        {/* Glowing Background Orbs */}
        <div className="pointer-events-none absolute -top-20 -start-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -end-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px]" />

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 backdrop-blur-md">
            <AcademicCapIcon className="h-6 w-6 text-blue-400" />
          </div>
          <span className="font-display text-2xl font-black tracking-wide text-white">
            أكاديمي
          </span>
        </div>

        {/* Center Dynamic Quote & Feature Highlights */}
        <div className="relative z-10 my-auto max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-3xl font-bold leading-relaxed text-white lg:text-4xl">
                {role === "student" ? (
                  <>
                    "جدولك، مدرسك، وتيرتك —{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                      إنت اللي تقرر
                    </span>"
                  </>
                ) : (
                  <>
                    "شارك خبرتك، انشئ مجموعاتك —{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                      والباقي علينا
                    </span>"
                  </>
                )}
              </h2>

              {/* Dynamic Feature Badges */}
              <div className="mt-8 space-y-3">
                {role === "student" ? (
                  <>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                      <span>جدولة أسبوعية مرنة تتناسب مع وقتك</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                      <span>مدرسون معتمدون في البرمجة واللغات</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                      <span>أدوات إدارة المجموعات والتحصيل المالي</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                      <span>وصول آلاف الطلاب الراغبين بالتعلم</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Social Proof Card */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 space-x-reverse overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-blue-500 text-center text-xs font-bold leading-8 text-white">
                  ع
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-emerald-500 text-center text-xs font-bold leading-8 text-white">
                  م
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-amber-500 text-center text-xs font-bold leading-8 text-white">
                  س
                </div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-purple-500 text-center text-xs font-bold leading-8 text-white">
                  +٥٠
                </div>
              </div>
              <p className="text-xs font-medium text-slate-300">
                مدرس معتمد جاهز يعلّمك — انضم إليم اليوم
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="relative z-10 text-xs text-slate-500">
          أكاديمي © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </p>
      </div>

      {/* ---------------- RIGHT SIDE: REGISTRATION FORM ---------------- */}
      <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          
          {/* Form Header */}
          <div className="text-center">
            <h1 className="font-display text-3xl font-black text-slate-900">
              إنشاء حساب جديد
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              عندك حساب؟{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                سجّل الدخول
              </Link>
            </p>
          </div>

          {/* Animated Role Switcher Toggle */}
          <div className="relative flex rounded-2xl bg-slate-200/70 p-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors ${
                role === "student" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              طالب
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors ${
                role === "teacher" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              مدرس
            </button>

            {/* Sliding Pill Background */}
            <motion.div
              className="absolute inset-y-1.5 rounded-xl bg-white shadow-md"
              initial={false}
              animate={{
                x: role === "student" ? "0%" : "100%",
                width: "48%",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                الاسم الكامل
              </label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute start-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="مثال: كريم بن علي"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pe-4 ps-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <EnvelopeIcon className="pointer-events-none absolute start-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pe-4 ps-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <LockClosedIcon className="pointer-events-none absolute start-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pe-11 ps-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full py-3.5 shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30"
            >
              إنشاء حساب كـ {role === "student" ? "طالب" : "مدرس"}
            </Button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-slate-50 px-4 text-xs font-semibold text-slate-400">
              أو سجّل بواسطة
            </span>
          </div>

          {/* Google Quick Sign-Up */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.24v3.15C3.26 21.37 7.37 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.24C.45 8.19 0 9.99 0 12s.45 3.81 1.24 5.39l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.63 1.24 6.61l4.04 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>متابعة باستخدام Google</span>
          </button>

        </div>
      </div>
    </div>
  );
}