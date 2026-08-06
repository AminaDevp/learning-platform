import { useAuth } from "../../context/AuthContext";
import { 
  AcademicCapIcon, 
  CalendarDaysIcon, 
  ClockIcon, 
  UserGroupIcon, 
  StarIcon,
  SparklesIcon,
  ArrowUpRightIcon,
  PlayIcon,
  PlusIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

export default function DashboardHome() {
  const { user } = useAuth();

  const role = user?.role?.toLowerCase() || "student";
  const isAdmin = role === "admin";
  const isInstructor = role === "teacher" || role === "instructor";

  // Dynamic Role Configs
  const roleConfig = {
    badge: isAdmin ? "لوحة التحكم الإدارية" : isInstructor ? "وضع المدرب النشط" : "مسار التعلم الشخصي",
    subtitle: isAdmin
      ? "تنبيه: يوجد 5 طلبات انضمام جديدة مدربين بانتظار المراجعة اليوم."
      : isInstructor
      ? "لديك 2 جلسات قادمة اليوم و14 واجب بانتظار التصحيح."
      : "واصل التقدم! أنجزت 75% من كورس React هذا الأسبوع.",
    ctaLabel: isAdmin ? "إدارة المستخدِمين" : isInstructor ? "إضافة كورس جديد" : "متابعة التعلم",
    ctaIcon: isAdmin ? Cog6ToothIcon : isInstructor ? PlusIcon : PlayIcon,
    sectionTitle: isAdmin ? "أحدث الكورسات في المنصة" : isInstructor ? "الكورسات التي تدرسها" : "متابعة الكورسات",
    sectionSubtitle: isAdmin ? "نظرة عامة على نشاط المنصة" : "آخر التحديثات والتقدم الحالي",
  };

  // Dynamic Stats for 3 Roles
  const stats = isAdmin
    ? [
        { label: "إجمالي الطلاب", value: "1,240", change: "+18% هذا الشهر", icon: UserGroupIcon, color: "text-blue-600", bg: "bg-blue-50/80" },
        { label: "المدرسون والمدربون", value: "32", change: "3 انضموا مؤخراً", icon: AcademicCapIcon, color: "text-indigo-600", bg: "bg-indigo-50/80" },
        { label: "الكورسات المتاحة", value: "48", change: "12 كورس نشط الآن", icon: BookOpenIcon, color: "text-emerald-600", bg: "bg-emerald-50/80" },
      ]
    : isInstructor
    ? [
        { label: "الطلاب النشطون", value: "24", change: "+12% هذا الشهر", icon: UserGroupIcon, color: "text-blue-600", bg: "bg-blue-50/80" },
        { label: "جلسات هذا الأسبوع", value: "8", change: "2 جلسات اليوم", icon: CalendarDaysIcon, color: "text-indigo-600", bg: "bg-indigo-50/80" },
        { label: "التقييم العام", value: "4.9", change: "من 120 تقييم", icon: StarIcon, color: "text-amber-500", bg: "bg-amber-50/80" },
      ]
    : [
        { label: "الكورسات المسجلة", value: "4", change: "2 نشطة الآن", icon: AcademicCapIcon, color: "text-blue-600", bg: "bg-blue-50/80" },
        { label: "جلسات هذا الأسبوع", value: "3", change: "القادمة اليوم 05:00", icon: CalendarDaysIcon, color: "text-indigo-600", bg: "bg-indigo-50/80" },
        { label: "ساعات التعلم", value: "18.5h", change: "+4h هذا الأسبوع", icon: ClockIcon, color: "text-emerald-600", bg: "bg-emerald-50/80" },
      ];

  const recentCourses = [
    { title: "تطوير واجهات المستخدم بـ React & Tailwind", progress: 75, totalLessons: 24, completedLessons: 18, instructor: "أ. أحمد السعيد" },
    { title: "أساسيات JavaScript Advanced & Async", progress: 40, totalLessons: 15, completedLessons: 6, instructor: "د. سارة محمود" },
  ];

  const CtaIcon = roleConfig.ctaIcon;

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/10 border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 backdrop-blur-md">
              {isAdmin ? <ShieldCheckIcon className="h-4 w-4 text-blue-400" /> : <SparklesIcon className="h-4 w-4 text-blue-400" />}
              <span>{roleConfig.badge}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-white">
              أهلاً بك، {user?.name || "المستخدم"} 👋
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {roleConfig.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 active:scale-95">
              <CtaIcon className="h-5 w-5" />
              <span>{roleConfig.ctaLabel}</span>
            </button>
          </div>
        </div>

        {/* Ambient Decorative Light Gradients */}
        <div className="absolute -top-24 -end-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
      </div>

      {/* Modern KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">{stat.label}</span>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Left/Center Section: Active Progress or Activities */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {roleConfig.sectionTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{roleConfig.sectionSubtitle}</p>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                <span>عرض الكل</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {recentCourses.map((course, index) => (
                <div 
                  key={index}
                  className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50 hover:border-slate-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">{course.title}</h4>
                    <span className="text-xs font-semibold text-slate-500">{course.completedLessons}/{course.totalLessons} درس</span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-400">{course.instructor}</span>
                      <span className="text-blue-600 font-bold">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200/80 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Interactive Schedule Widget */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">جدول اليوم</h3>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">3 جلسات</span>
            </div>

            <div className="relative space-y-4 before:absolute before:start-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100">
              
              {/* Event 1 */}
              <div className="relative flex items-start gap-4 ps-8">
                <span className="absolute start-2 top-1.5 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">05:00 PM - 06:30 PM</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">جلسة مباشر: بناء APIs</p>
                  <p className="text-xs text-slate-400 mt-1">القاعة الافتراضية #2</p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start gap-4 ps-8">
                <span className="absolute start-2 top-1.5 h-3 w-3 rounded-full bg-slate-300" />
                <div className="flex-1 rounded-xl border border-slate-100 bg-white p-3.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">08:00 PM - 09:00 PM</span>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">مراجعة المشاريع التطبيقية</p>
                  <p className="text-xs text-slate-400 mt-1">تسليم الواجب الأول</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}