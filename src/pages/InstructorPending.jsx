import { ClockIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function InstructorPending() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // 1. مسح الحساب عبر AuthContext (أو مباشرة من localStorage)
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("user");
    }

    // 2. التوجيه الفوري إلى صفحة تسجيل الدخول
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md text-center rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-4 animate-pulse">
          <ClockIcon className="h-10 w-10" />
        </div>

        <h1 className="font-display text-2xl font-bold text-slate-900">
          طلبك قيد المراجعة
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
 شكراً لتسجيلك معنا! تم إرسال طلبك إلى فريق الإدارة. يستغرق التدقيق في الطلبات والرد عليها حتى **48 ساعة**.
        </p>

        <div className="mt-6 rounded-2xl bg-amber-50/60 p-4 text-xs font-medium text-amber-800 border border-amber-200/50">
          سيتم إشعارك عبر البريد الإلكتروني فور الموافقة على حسابك وتفعيله.
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}