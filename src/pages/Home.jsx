import { Link } from "react-router-dom";
import {
  CodeBracketIcon,
  LanguageIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Button from "../component/common/Button";

// الفئات الثلاث المحددة بخطة المشروع (برمجة/إنجليزي/مكس)
const CATEGORIES = [
  {
    title: "البرمجة",
    desc: "تعلّم من مدرسين محترفين عبر جلسات مباشرة وتمارين عملية.",
    icon: CodeBracketIcon,
  },
  {
    title: "اللغة الإنجليزية",
    desc: "محادثة، قواعد، وتحضير للامتحانات مع مدرسين معتمدين.",
    icon: LanguageIcon,
  },
  {
    title: "مكس (برمجة + إنجليزي)",
    desc: "مسار مدمج لمن يريد إتقان المصطلحات التقنية بالإنجليزية.",
    icon: SparklesIcon,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center">
        <h1 className="font-display text-4xl font-extrabold text-gray-900 md:text-5xl">
          تعلّم من أفضل المدرسين،
          <br />
          <span className="relative inline-block">
            بالوقت اللي يناسبك
            {/* العنصر المميز: خط ذهبي يتمدد من الوسط تحت العنوان الرئيسي */}
            <span className="absolute inset-x-0 -bottom-2 mx-auto h-1 w-2/3 origin-center scale-x-0 rounded-full bg-accent transition-transform duration-700 [animation:underline-grow_0.8s_ease-out_0.3s_forwards]" />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-gray-500">
          منصة تعليمية تربط الطلاب بأفضل المدرسين في البرمجة واللغة الإنجليزية،
          بجلسات مباشرة وجدول أسبوعي يتكوّن تلقائياً حسب اختيارك.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/register">
            <Button size="lg">ابدأ التعلّم الآن</Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" size="lg">
              تصفّح الكورسات
            </Button>
          </Link>
        </div>
      </section>

      {/* كيف تعمل المنصة — 3 خطوات، ضرورية لأن آلية "الجدول التلقائي بعد اكتمال العدد"
          غير بديهية لزائر أول مرة */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-display text-2xl font-bold text-gray-900">
          كيف تعمل المنصة
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
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
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* الفئات */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-2xl font-bold text-gray-900">
            اختر مسارك
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <cat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-gray-900">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style الخاص بحركة الخط الذهبي — @keyframes ما بينكتب مباشرة كـ Tailwind class */}
      <style>{`
        @keyframes underline-grow {
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}