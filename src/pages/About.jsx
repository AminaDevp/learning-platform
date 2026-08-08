import { motion } from "framer-motion";
import { 
  AcademicCapIcon, 
  CodeBracketIcon, 
  LanguageIcon, 
  SparklesIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  TrophyIcon
} from "@heroicons/react/24/solid";

const STATS = [
  { label: "طالب وطالبة", value: "+1,200", icon: UserGroupIcon },
  { label: "كورس تفاعلي", value: "+45", icon: AcademicCapIcon },
  { label: "نسبة الرضا", value: "98%", icon: TrophyIcon },
  { label: "مدرس خبير", value: "+15", icon: CheckBadgeIcon },
];

const PILLARS = [
  {
    icon: CodeBracketIcon,
    title: "تطوير البرمجيات الحديثة",
    description: "تركيز عملي على أحدث التقنيات مثل React وJavaScript وNode.js لإعدادك لسوق العمل مباشرة.",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    icon: LanguageIcon,
    title: "الإنجليزية التقنية والمحادثة",
    description: "تطوير مهارات التحدث والتواصل التقني لمساعدتك في اجتياز مقابلات العمل في الشركات العالمية.",
    gradient: "from-emerald-600 to-teal-700",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-100 py-12 font-sans">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center text-white shadow-2xl sm:p-14">
          <div className="relative z-10 mx-auto max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-3.5 py-1 text-xs font-semibold text-blue-400 backdrop-blur-xl">
              <SparklesIcon className="h-4 w-4 text-blue-400" />
              رؤيتنا ورسالتنا
            </span>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl leading-tight">
              نبني جيل المستقبل من المبرمجين والمحترفين
            </h1>
            <p className="text-slate-400 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
              أكاديمي هي منصة تعليمية متكاملة تهدف إلى تمكين الطلاب والمطورين من استيعاب البرمجة الحديثة واللغة الإنجليزية التقنية بأسلوب عملي وتفاعلي.
            </p>
          </div>

          {/* Ambient Lighting Background */}
          <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-blue-600/25 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -start-32 h-80 w-80 rounded-full bg-indigo-600/25 blur-[100px] pointer-events-none" />
        </div>

        {/* Platform Metrics Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 text-center shadow-sm"
            >
              <stat.icon className="mx-auto h-6 w-6 text-blue-600 mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Core Learning Pillars */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900">مجالات التركيز الرئيسية</h2>
            <p className="text-xs text-slate-500">نجمع بين المهارة التقنية واللغوية لتغطية متطلبات سوق العمل</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div 
                key={pillar.title} 
                className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.gradient} text-white mb-5 shadow-md`}>
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Philosophy */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-xl font-black text-slate-900">لماذا تختار منصة أكاديمي؟</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            نحن لا نكتفي بتقديم الفيديوهات، بل نوفر مساراً تعليمياً كاملاً يشمل التطبيق المباشر، المراجعة مع المدرسين، والتوجيه المستمر حتى تحقيق هدفك المهني.
          </p>
        </div>

      </section>
    </div>
  );
}