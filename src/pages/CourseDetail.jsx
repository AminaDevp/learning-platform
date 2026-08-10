import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, CalendarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "../component/common/Button";
import { MOCK_COURSES } from "../utils/mockCourses";

export default function CourseDetail() {
  const { id } = useParams();
  const course = MOCK_COURSES.find((c) => c.id === Number(id));

  // 3 مراحل: اختيار مدرس -> اختيار يوم -> تأكيد
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBook = () => {
    setSubmitting(true);
    // TODO: استبدال بـ POST /api/bookings حقيقي — يحتاج courseId + instructorId + day
    setTimeout(() => {
      setSubmitting(false);
      setBooked(true);
    }, 900);
  };

  if (!course) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-gray-500">هذا الكورس غير موجود.</p>
        <Link to="/courses" className="mt-4 inline-block font-medium text-primary hover:underline">
          العودة لقائمة الكورسات
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      {/* رأس الصفحة — بدون اسم مدرس، هذا كورس عام */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-white">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
          {course.category}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold">{course.title}</h1>
        <p className="mt-2 max-w-xl text-white/80">{course.description}</p>
      </div>

      <AnimatePresence mode="wait">
        {booked ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
          >
            <CheckCircleIcon className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-3 font-display text-lg font-semibold text-primary">
              تم تأكيد حجزك بنجاح
            </p>
            <p className="mt-1 text-sm text-gray-500">
              مع {selectedInstructor.name} — يوم {selectedDay}. بمجرد اكتمال عدد الطلاب، رح
              يتولّد جدولك الأسبوعي تلقائياً.
            </p>
            <Link to="/dashboard">
              <Button variant="outline" className="mt-4">
                الذهاب للوحة التحكم
              </Button>
            </Link>
          </motion.div>
        ) : !selectedInstructor ? (
          /* المرحلة 1: اختيار مدرس — اسمه ما يظهر إلا هون بالتحديد */
          <motion.div key="pick-instructor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <h2 className="font-display font-semibold text-gray-900">
              اختر المدرس ({course.instructors.length} متاحين)
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {course.instructors.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => setSelectedInstructor(inst)}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-start transition hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
                    {inst.name.replace("أ. ", "").charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-gray-900">{inst.name}</p>
                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <StarIcon className="h-4 w-4 text-accent" />
                      {inst.rating}
                      <span className="mx-1">·</span>
                      <span className="font-medium text-primary">{inst.price}</span>
                    </div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-300 rtl:rotate-180" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* المرحلة 2: اختيار يوم — أيام هذا المدرس تحديداً */
          <motion.div key="pick-day" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <button
              onClick={() => {
                setSelectedInstructor(null);
                setSelectedDay(null);
              }}
              className="mb-4 text-sm text-gray-500 hover:text-primary"
            >
              ← تغيير المدرس
            </button>

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h2 className="font-display font-semibold text-gray-900">
                  الأيام المتاحة مع {selectedInstructor.name}
                </h2>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedInstructor.days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedDay === day
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 text-gray-600 hover:border-primary/40"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleBook}
                loading={submitting}
                disabled={!selectedDay}
                className="mt-6 w-full"
              >
                تأكيد الحجز والدفع ({selectedInstructor.price})
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}