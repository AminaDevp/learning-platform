// جدول جلسات المدرس — بيانات مؤقتة (placeholder).
// رح تنستبدل بـ GET /api/instructor/schedule حقيقي لما يجهزه الـ Backend.
export const MOCK_SCHEDULE = [
  { id: 1, courseTitle: "أساسيات React", day: "السبت", time: "18:00", status: "scheduled" },
  { id: 2, courseTitle: "أساسيات React", day: "الاثنين", time: "18:00", status: "scheduled" },
  { id: 3, courseTitle: "أساسيات React", day: "الأربعاء", time: "18:00", status: "scheduled" },
];

// الأيام المتاحة للتعويض — بالواقع لازم تجي من الـ Backend (أيام فاضية
// بجدول المدرس نفسه، مو كل أيام الأسبوع عشوائياً)
export const AVAILABLE_REPLACEMENT_DAYS = ["الأحد", "الثلاثاء", "الخميس", "الجمعة"];