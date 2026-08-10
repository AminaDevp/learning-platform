// طلبات تقديم المدرسين — بيانات مؤقتة (placeholder).
// رح تنستبدل بـ GET /api/admin/instructor-applications لما يجهزها الـ Backend.
export const MOCK_APPLICATIONS = [
  {
    id: 1,
    name: "أحمد الزغلامي",
    email: "ahmed.z@email.com",
    department: "برمجة",
    experience: "5 سنوات خبرة بتطوير الويب (React, Node.js)، درّب بمعهد خاص لسنتين.",
    status: "pending",
  },
  {
    id: 2,
    name: "ليلى بن سالم",
    email: "layla.bs@email.com",
    department: "إنجليزي",
    experience: "شهادة CELTA، 3 سنوات تدريس محادثة وقواعد لمستويات مختلفة.",
    status: "pending",
  },
  {
    id: 3,
    name: "محمد الطرابلسي",
    email: "mohamed.t@email.com",
    department: "برمجة",
    experience: "مهندس Backend بـ Django، خبرة تدريس أونلاين سابقة.",
    status: "pending",
  },
];