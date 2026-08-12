// اقتراحات كورسات من المدرسين — بيانات مؤقتة (placeholder).
// رح تنستبدل بـ API حقيقي: POST /api/instructor/suggestions (من المدرس)
// و GET /api/admin/suggestions (للأدمن) لما يجهزهم الـ Backend.
export const MOCK_SUGGESTIONS = [
  {
    id: 1,
    title: "TypeScript للمحترفين",
    category: "برمجة",
    instructorName: "أ. كريم بن علي",
    reason: "طلب كتير من طلابي الحاليين بعد ما خلصوا كورس React أساسيات.",
    status: "pending",
  },
  {
    id: 2,
    title: "الكتابة الأكاديمية بالإنجليزية",
    category: "إنجليزي",
    instructorName: "أ. منى الطرابلسي",
    reason: "فيه طلب كبير من طلاب جامعيين يحتاجوا كتابة أبحاث بالإنجليزية.",
    status: "pending",
  },
];