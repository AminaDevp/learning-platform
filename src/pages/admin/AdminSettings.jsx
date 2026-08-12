import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cog6ToothIcon,
  UserIcon,
  LockClosedIcon,
  BellIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

export default function AdminSettings() {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "مدير النظام",
    email: user?.email || "admin@example.com",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    newEnrollment: true,
    newInstructorRequest: true,
  });

  const [savedStatus, setSavedStatus] = useState("");

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSavedStatus("profile");
    setTimeout(() => setSavedStatus(""), 3000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }
    setSavedStatus("password");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSavedStatus(""), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
            <Cog6ToothIcon className="h-7 w-7 text-indigo-300" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              إعدادات الحساب
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              إدارة الملف الشخصي، الأمان، وتفضيلات إشعارات اللوحة.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {/* 2. Profile Section */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleProfileSave}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  الملف الشخصي
                </h3>
                <p className="text-xs text-slate-500">
                  تحديث اسم الحساب والبريد الإلكتروني للردود.
                </p>
              </div>
            </div>

            {savedStatus === "profile" && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full"
              >
                <CheckCircleIcon className="h-4 w-4" />
                تم التحديث بنجاح
              </motion.span>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="الاسم الكامل"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
            <Input
              label="البريد الإلكتروني"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm" className="rounded-xl px-6">
              حفظ التغييرات
            </Button>
          </div>
        </motion.form>

        {/* 3. Password & Security Section */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handlePasswordSave}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <LockClosedIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  تغيير كلمة المرور
                </h3>
                <p className="text-xs text-slate-500">
                  تأمين حسابك بكلمة مرور قوية ومحدثة.
                </p>
              </div>
            </div>

            {savedStatus === "password" && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full"
              >
                <ShieldCheckIcon className="h-4 w-4" />
                تم تحديث كلمة المرور
              </motion.span>
            )}
          </div>

          <div className="space-y-4">
            <Input
              label="كلمة المرور الحالية"
              type="password"
              placeholder="••••••••"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="كلمة المرور الجديدة"
                type="password"
                placeholder="••••••••"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
              />
              <Input
                label="تأكيد كلمة المرور الجديدة"
                type="password"
                placeholder="••••••••"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm" className="rounded-xl px-6">
              تحديث كلمة المرور
            </Button>
          </div>
        </motion.form>

        {/* 4. Notification Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <BellIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                تفضيلات الإشعارات
              </h3>
              <p className="text-xs text-slate-500">
                التحكم بالفعاليات التي تريد استقبال إشعارات حولها.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Toggle Item 1 */}
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition-colors cursor-pointer">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-800">
                  تسجيل طالب جديد
                </p>
                <p className="text-xs text-slate-500">
                  تلقي إشعار فور انضمام طالب جديد لأحد الكورسات.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.newEnrollment}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    newEnrollment: e.target.checked,
                  })
                }
                className="h-5 w-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
            </label>

            {/* Toggle Item 2 */}
            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition-colors cursor-pointer">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-800">
                  طلب انضمام مدرب جديد
                </p>
                <p className="text-xs text-slate-500">
                  تلقي تنبيه عند تقديم مدرب لطلب الانضمام للمنصة.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.newInstructorRequest}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    newInstructorRequest: e.target.checked,
                  })
                }
                className="h-5 w-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  );
}