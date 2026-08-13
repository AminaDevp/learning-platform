import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  VideoCameraIcon,
  CheckCircleIcon,
  CameraIcon,
  UserIcon,
  SparklesIcon,
  PhotoIcon,
  CheckIcon,
  PlayIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

// دالة تحويل الروابط العادية إلى روابط Embed جاهزة للـ iframe
function getEmbedUrl(url) {
  if (!url) return null;

  // 1. YouTube Video (Regular & Shorts)
  const ytRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // 2. Google Drive Video
  const driveRegex = /drive\.google\.com\/file\/d\/([^\/]+)/;
  const driveMatch = url.match(driveRegex);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  return null;
}

export default function InstructorProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [videoUrl, setVideoUrl] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  // حساب رابط المعاينة
  const embedVideoUrl = useMemo(() => getEmbedUrl(videoUrl), [videoUrl]);

  // 1. حساب نسبة اكتمال الملف الشخصي ديناميكياً
  const completionData = useMemo(() => {
    const fields = [
      { key: "avatar", label: "الصورة الشخصية", isComplete: Boolean(avatarPreview) },
      { key: "name", label: "الاسم الظاهر", isComplete: Boolean(name.trim()) },
      { key: "videoUrl", label: "فيديو التعريف", isComplete: Boolean(embedVideoUrl) },
      { key: "bio", label: "النبذة التعريفية", isComplete: Boolean(bio.trim()) },
    ];

    const completedCount = fields.filter((f) => f.isComplete).length;
    const percentage = Math.round((completedCount / fields.length) * 100);

    return { percentage, fields };
  }, [avatarPreview, name, embedVideoUrl, bio]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <UserIcon className="h-6 w-6 text-indigo-300" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  الملف الشخصي
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  إدارة وتعديل بياناتك الشخصية والفيديو التعريفي الظاهر للطلاب.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md border border-white/10">
            <SparklesIcon className="h-5 w-5 text-indigo-300 shrink-0" />
            <span className="text-xs font-bold text-slate-200">
              الملف الشخصي نشط ومتاح للطلاب
            </span>
          </div>
        </div>
      </div>

      {/* 2. شريط اكتمال الملف الشخصي */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-indigo-50/30 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>نسبة اكتمال ملفك الشخصي</span>
              {completionData.percentage === 100 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
                  <CheckIcon className="h-3 w-3" /> مكتمل بالكامل
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500">
              الملفات المكتملة تعزز ثقة الطلاب وتزيد من نسبة التسجيل في دوراتك.
            </p>
          </div>
          <span className="font-display text-2xl font-bold text-indigo-600">
            {completionData.percentage}%
          </span>
        </div>

        {/* شريط التقدم البصري */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionData.percentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`h-full rounded-full transition-all ${
              completionData.percentage === 100
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-indigo-500 to-indigo-600"
            }`}
          />
        </div>

        {/* قائمة الحقول المطلوبة وشارات الإنجاز */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {completionData.fields.map((field) => (
            <div
              key={field.key}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold border transition-all ${
                field.isComplete
                  ? "bg-white border-emerald-200/80 text-emerald-700 shadow-2xs"
                  : "bg-slate-100/60 border-slate-200/60 text-slate-400"
              }`}
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  field.isComplete
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-300 text-white"
                }`}
              >
                {field.isComplete ? "✓" : "!"}
              </div>
              <span className="truncate">{field.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. بطاقة نموذج البيانات */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
          {/* الصورة الشخصية */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              الصورة الشخصية
            </label>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border-2 border-indigo-100 bg-indigo-50/50 shadow-sm transition-all hover:border-indigo-500 focus:outline-none"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="صورتي الشخصية"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-indigo-600">
                    {name.charAt(0) || "؟"}
                  </span>
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 backdrop-blur-[2px] transition duration-200 group-hover:opacity-100">
                  <CameraIcon className="h-7 w-7 text-white" />
                </span>
              </button>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <PhotoIcon className="h-4 w-4" />
                  <span>تغيير الصورة</span>
                </button>
                <p className="text-[11px] font-semibold text-slate-400">
                  صيغ الصورة المسموحة: JPG أو PNG، بحد أقصى 2MB.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* الحقول النصية */}
          <div className="space-y-6">
            <Input
              label="الاسم الظاهر للطلاب"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                النبذة التعريفية (Bio)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="اكتب نبذة قصيرة عن خبرتك الأكاديمية وأسلوبك في التدريس..."
                className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* قسم الفيديو والمعاينة المباشرة */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <VideoCameraIcon className="h-4 w-4 text-indigo-600" />
                  رابط فيديو التعريف
                </label>
                <Input
                  name="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... أو رابط Google Drive"
                />
                <p className="text-[11px] font-semibold text-slate-400">
                  ادعم روابط YouTube أو Google Drive لتشغيل معاينة فورية.
                </p>
              </div>

              {/* المكون التفاعلي لمعاينة الفيديو */}
              <AnimatePresence>
                {videoUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                        <PlayIcon className="h-3.5 w-3.5 text-indigo-600" />
                        معاينة الفيديو الظاهر للطلاب
                      </span>
                    </div>

                    {embedVideoUrl ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 shadow-inner">
                        <iframe
                          src={embedVideoUrl}
                          title="فيديو التعريف"
                          className="absolute inset-0 h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs font-semibold text-amber-700 border border-amber-200/60">
                        <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
                        <span>
                          الرابط غير صالح للتشغيل المباشر. يرجى التأكد من إضافة رابط يوتيوب أو غوغل درايف صحيح.
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* أزرار الإجراءات */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              type="submit"
              loading={saving}
              className="rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 px-6 py-3 text-xs"
            >
              حفظ التعديلات
            </Button>

            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-600 border border-emerald-200/60"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  تم حفظ التعديلات بنجاح
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}