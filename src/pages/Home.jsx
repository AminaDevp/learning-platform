import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  LanguageIcon,
  SparklesIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "../component/common/Button";

const CATEGORIES = [
  {
    title: "البرمجة",
    desc: "تعلّم من مدرسين محترفين عبر جلسات مباشرة وتمارين عملية.",
    icon: CodeBracketIcon,
    chip: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20",
    gradient: "from-blue-500/20 to-indigo-500/5",
    link: "/courses?category=programming",
  },
  {
    title: "اللغة الإنجليزية",
    desc: "محادثة، قواعد، وتحضير للامتحانات مع مدرسين معتمدين.",
    icon: LanguageIcon,
    chip: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20",
    gradient: "from-emerald-500/20 to-teal-500/5",
    link: "/courses?category=english",
  },
  {
    title: "مكس (برمجة + إنجليزي)",
    desc: "مسار مدمج لمن يريد إتقان المصطلحات التقنية بالإنجليزية.",
    icon: SparklesIcon,
    chip: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20",
    gradient: "from-amber-500/20 to-orange-500/5",
    link: "/courses?category=mix",
  },
];

const STEPS = [
  {
    step: "١",
    title: "اختر كورسك ومدرسك",
    desc: "تصفّح الكورسات المتاحة واختر المدرس والأيام المناسبة لك.",
  },
  {
    step: "٢",
    title: "احجز وادفع",
    desc: "أكمل الحجز والدفع بأمان — مكانك محجوز فوراً.",
  },
  {
    step: "٣",
    title: "استلم جدولك",
    desc: "بمجرد اكتمال عدد الطلاب، يتولّد جدولك الأسبوعي تلقائياً وتبدأ.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-slate-50/50">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-400/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-96 -left-40 h-[400px] w-[400px] rounded-full bg-emerald-400/15 blur-[120px]" />

      {/* Hero Section */}
      <section className="relative px-4 pb-20 pt-16 md:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:col-span-7 lg:text-start"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700">
                تسجيل المجموعات الجديدة مفتوح الآن
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-black leading-tight text-slate-900 sm:text-5xl md:text-6xl md:leading-[1.15]">
              تعلّم من أفضل المدرسين،
              <br />
              <span className="relative inline-block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                بالوقت اللي يناسبك
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-600 lg:mx-0">
              منصة تعليمية تربط الطلاب بأفضل المدرسين في البرمجة واللغة الإنجليزية،
              بجلسات مباشرة وجدول أسبوعي يتكوّن تلقائياً حسب اختيارك.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all">
                  ابدأ التعلّم الآن
                </Button>
              </Link>
              <Link to="/courses" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full bg-white hover:bg-slate-50">
                  تصفّح الكورسات
                </Button>
              </Link>
            </div>

            {/* Micro Social Proof Bar */}
            <div className="mt-10 flex items-center justify-center gap-6 border-t border-slate-200/60 pt-6 lg:justify-start">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-800">+٢,٤٠٠ طالب</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-800">جلسات مباشرة ١٠٠٪</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visual Glassmorphic Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative hidden aspect-square items-center justify-center lg:col-span-5 lg:flex"
          >
            {/* Main Visual Frame */}
            <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 shadow-2xl ring-1 ring-white/10">
              
              {/* Glowing Inner Accents */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />

              {/* Card 1: Live Course Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
                className="absolute top-8 start-6 w-52 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                    <CodeBracketIcon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">مباشر الآن</span>
                </div>
                <p className="mt-3 font-display text-sm font-bold text-slate-900">أساسيات React</p>
                <p className="mt-0.5 text-xs text-slate-500">مع أ. كريم بن علي</p>
              </motion.div>

              {/* Card 2: Student Stat Floating Widget */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="absolute bottom-12 end-6 w-48 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur-md"
              >
                <p className="font-display text-3xl font-black text-blue-600">+٢,٤٠٠</p>
                <p className="mt-0.5 text-xs font-medium text-slate-600">طالب انضموا هذا الشهر</p>
              </motion.div>

              {/* Card 3: Rating Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 start-8 flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-400 p-3 shadow-lg"
              >
                <span className="font-display text-base font-black text-slate-950">٤.٩★</span>
                <span className="text-xs font-bold text-slate-900">تقييم الطلاب</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* How it Works Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black text-slate-900 md:text-4xl">
            كيف تعمل المنصة
          </h2>
          <p className="mt-3 text-base text-slate-600">
            خطوات بسيطة تضمن لك تجربة تعليمية سلسة ومباشرة
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 font-display text-xl font-extrabold text-white shadow-md shadow-blue-500/20">
                {item.step}
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories / Pathways Section */}
      <section className="border-t border-slate-200/60 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black text-slate-900 md:text-4xl">
              اختر مسارك التعليمي
            </h2>
            <p className="mt-3 text-base text-slate-600">
              مسارات صُممت لتناسب مستواك وطموحك المهني
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Link
                  to={cat.link}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Hover Subtle Gradient Fill */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                  <div className="relative z-10">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cat.chip} transition-transform duration-300 group-hover:scale-110`}>
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-slate-900">
                      {cat.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-bold text-blue-600">
                    <span>استكشف المسار</span>
                    <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}