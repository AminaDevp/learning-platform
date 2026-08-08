import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  StarIcon, 
  MagnifyingGlassIcon, 
  BookOpenIcon, 
  ClockIcon, 
  SparklesIcon,
  AcademicCapIcon,
  HeartIcon,
  ChevronDownIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

const MOCK_COURSES = [
  { 
    id: 1, 
    title: "أساسيات React & Tailwind CSS", 
    category: "برمجة", 
    instructor: "أ. كريم بن علي", 
    role: "Senior Frontend Engineer",
    price: 120, 
    originalPrice: 160,
    rating: 4.9,
    reviews: 84,
    lessons: 24,
    duration: "18 ساعة",
    level: "مبتدئ",
    badge: "الأكثر مبيعاً",
    gradient: "from-blue-600 via-indigo-600 to-slate-900"
  },
  { 
    id: 2, 
    title: "JavaScript Advanced & Async Mastery", 
    category: "برمجة", 
    instructor: "أ. سارة أحمد", 
    role: "Fullstack Developer",
    price: 100, 
    originalPrice: 130,
    rating: 4.8,
    reviews: 112,
    lessons: 18,
    duration: "14 ساعة",
    level: "متوسط",
    badge: "مميز",
    gradient: "from-slate-800 via-slate-900 to-indigo-950"
  },
  { 
    id: 3, 
    title: "محادثة إنجليزي متقدم للمحترفين", 
    category: "إنجليزي", 
    instructor: "أ. منى الطرابلسي", 
    role: "Certified IELTS Trainer",
    price: 90, 
    originalPrice: 120,
    rating: 4.7,
    reviews: 65,
    lessons: 15,
    duration: "10 ساعات",
    level: "متقدم",
    badge: "جديد",
    gradient: "from-emerald-600 via-teal-700 to-slate-900"
  },
  { 
    id: 4, 
    title: "قواعد إنجليزي واستماع للمبتدئين", 
    category: "إنجليزي", 
    instructor: "أ. رانيا حمدي", 
    role: "English Specialist",
    price: 80, 
    originalPrice: 100,
    rating: 4.6,
    reviews: 42,
    lessons: 20,
    duration: "12 ساعة",
    level: "مبتدئ",
    badge: null,
    gradient: "from-amber-500 via-orange-600 to-slate-900"
  },
  { 
    id: 5, 
    title: "برمجة المواقع بالإنجليزية التقنية", 
    category: "مكس", 
    instructor: "أ. يوسف قاسمي", 
    role: "Tech Lead & Mentor",
    price: 150, 
    originalPrice: 190,
    rating: 5.0,
    reviews: 29,
    lessons: 30,
    duration: "25 ساعة",
    level: "جميع المستويات",
    badge: "أعلى تقييم",
    gradient: "from-indigo-600 via-purple-700 to-slate-900"
  },
];

const FILTERS = ["الكل", "برمجة", "إنجليزي", "مكس"];

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filtered = MOCK_COURSES
    .filter((course) => {
      const matchesFilter = activeFilter === "الكل" || course.category === activeFilter;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-100 py-10 font-sans">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center text-white shadow-2xl sm:p-14">
          <div className="relative z-10 mx-auto max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-3.5 py-1 text-xs font-semibold text-blue-400 backdrop-blur-xl">
              <SparklesIcon className="h-4 w-4 text-blue-400" />
              منصة التعلم الأكاديمي
            </span>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl leading-tight">
              استكشف أحدث الكورسات والمسارات التقنية
            </h1>
            <p className="text-slate-400 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
              تعلّم من الخبراء واكتسب المهارات العملية المطلوبة في سوق العمل للتطوير واللغات.
            </p>
          </div>

          {/* Decorative Glows */}
          <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-blue-600/25 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -start-32 h-80 w-80 rounded-full bg-indigo-600/25 blur-[100px] pointer-events-none" />
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm backdrop-blur-md">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Controls: Search + Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <MagnifyingGlassIcon className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث باسم الكورس أو المدرس..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 ps-9 pe-3 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Sort Selector */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto appearance-none rounded-xl border border-slate-200 bg-slate-50/50 py-2 ps-3 pe-8 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white cursor-pointer"
              >
                <option value="recommended">الأكثر ملاءمة</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="price-low">الأقل سعراً</option>
                <option value="price-high">الأعلى سعراً</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <span>نتائج البحث (<strong className="text-slate-900">{filtered.length}</strong>)</span>
        </div>

        {/* Cards Grid */}
        <motion.div layout className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((course) => {
              const isFav = favorites.includes(course.id);
              return (
                <motion.div
                  layout
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div>
                    {/* Visual Card Top Header */}
                    <div className={`relative flex h-28 items-start justify-between p-3.5 bg-gradient-to-r ${course.gradient}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-white/20 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/20">
                          {course.category}
                        </span>
                        {course.badge && (
                          <span className="rounded-md bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-black shadow-sm">
                            {course.badge}
                          </span>
                        )}
                      </div>

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={() => toggleFavorite(course.id)}
                        className="rounded-full bg-slate-900/40 p-2 text-white backdrop-blur-md transition hover:bg-white hover:text-red-500"
                      >
                        {isFav ? (
                          <HeartIcon className="h-4 w-4 text-red-500" />
                        ) : (
                          <HeartIconOutline className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5 space-y-3.5">
                      {/* Rating & Level */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                          <StarIcon className="h-3.5 w-3.5 text-amber-500" />
                          <span className="font-bold text-amber-800">{course.rating}</span>
                          <span className="text-slate-400 text-[10px]">({course.reviews})</span>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                          {course.level}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      {/* Instructor Info */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 font-black text-xs shrink-0 border border-blue-100">
                          {course.instructor.charAt(3) || "م"}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-1">
                            <p className="text-xs font-bold text-slate-800 truncate">{course.instructor}</p>
                            <CheckBadgeIcon className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">{course.role}</p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <BookOpenIcon className="h-3.5 w-3.5 text-slate-400" />
                          <span>{course.lessons} درس</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ClockIcon className="h-3.5 w-3.5 text-slate-400" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="p-5 pt-0 border-t border-slate-100/60 mt-2">
                    <div className="flex items-center justify-between my-3">
                      <span className="text-xs text-slate-400">السعر الكلي</span>
                      <div className="flex items-baseline gap-1.5">
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through font-medium">
                            {course.originalPrice} د.ت
                          </span>
                        )}
                        <span className="text-lg font-black text-slate-900 tracking-tight">
                          {course.price} <span className="text-xs font-bold text-blue-600">د.ت</span>
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600 active:scale-95 shadow-md shadow-slate-900/10"
                    >
                      <span>عرض التفاصيل والحجز</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <AcademicCapIcon className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">لم يتم العثور على نتائج</h3>
            <p className="mt-1 text-xs text-slate-400">جرب البحث بكلمات مفتاحية أخرى أو اختر فئة مختلفة.</p>
            <button
              onClick={() => { setActiveFilter("الكل"); setSearchQuery(""); }}
              className="mt-4 rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100 transition"
            >
              إعادة الضبط
            </button>
          </div>
        )}
      </section>
    </div>
  );
}