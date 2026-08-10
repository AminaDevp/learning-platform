import { useState } from "react";
import { CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";

export default function AdminInstructors() {
  // قائمة تجريبية لطلبات الانضمام المعلقة (Pending Requests)
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "أحمد السعيد",
      email: "ahmed@example.com",
      specialty: "programming",
      experienceYears: 4,
      bio: "مطور Web كامل الخبرة مع تجربة في تدريس React و Node.js",
      status: "pending",
    },
    {
      id: 2,
      name: "سارة محمود",
      email: "sara@example.com",
      specialty: "english",
      experienceYears: 2,
      bio: "مدربة لغة إنجليزية حاصلة على شهادة TESOL",
      status: "pending",
    },
  ]);

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    alert("تم قبول الطلب وتفعيل حساب المدرس وإرسال بريد التفعيل.");
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    alert("تم رفض الطلب وإبلاغ المدرس عبر البريد.");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          طلبات الانضمام للمدرسين
        </h1>
        <p className="text-sm text-slate-500">
          إدارة ومراجعة طلبات التقديم الجديدة الخاصة بالمدرسين
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          لا توجد طلبات معلقة حالياً.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {requests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{req.name}</h3>
                  <p className="text-xs text-slate-500">{req.email}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                  req.specialty === "programming"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-purple-50 text-purple-700"
                }`}>
                  {req.specialty === "programming" ? "برمجة" : "إنجليزي"}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p><span className="font-bold">سنوات الخبرة:</span> {req.experienceYears} سنوات</p>
                <p><span className="font-bold">نبذة:</span> {req.bio}</p>
              </div>

              {/* أزرار القبول والرفض */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  <CheckIcon className="h-4 w-4" />
                  قبول الحساب
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4" />
                  رفض
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}