import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { VideoCameraIcon, CheckCircleIcon, CameraIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

export default function InstructorProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [videoUrl, setVideoUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    // معاينة فورية بالمتصفح بدون رفع فعلي — الملف الحقيقي بيترفع مع الـ submit
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    // TODO: استبدال بـ PATCH /api/instructor/profile حقيقي — يحتاج
    // multipart/form-data لرفع avatarFile (لو تغيّرت)، وليس فقط JSON.
    // فيديو التعريف على الأغلب رابط Google Drive/YouTube يدوي بمرحلة الـ MVP
    // حسب خطة المشروع، مو رفع ملف مباشر.
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 700);
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-bold text-gray-900">ملفي الشخصي</h1>
      <p className="mt-1 text-gray-500">عدّل صورتك واسمك وفيديو التعريف الظاهر للطلاب.</p>

      <form onSubmit={handleSave} className="mt-8 flex flex-col gap-5">
        {/* الصورة الشخصية */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-primary/10"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="صورتي الشخصية" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-display text-xl font-bold text-primary">
                {name.charAt(0) || "؟"}
              </span>
            )}
            {/* طبقة شفافة عند hover تدل إنه قابل للتغيير */}
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <CameraIcon className="h-6 w-6 text-white" />
            </span>
          </button>

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-medium text-primary hover:underline"
            >
              تغيير الصورة
            </button>
            <p className="mt-0.5 text-xs text-gray-400">JPG أو PNG، بحد أقصى 2MB</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <Input
          label="الاسم الظاهر للطلاب"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <VideoCameraIcon className="h-4 w-4 text-primary" />
            رابط فيديو التعريف
          </label>
          <Input
            name="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="رابط يوتيوب أو Google Drive"
          />
          <p className="mt-1.5 text-xs text-gray-400">
            فيديو قصير (دقيقة أو دقيقتين) بيعرّف فيه الطالب عليك قبل ما يختارك.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" loading={saving}>
            حفظ التعديلات
          </Button>

          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-sm font-medium text-primary"
            >
              <CheckCircleIcon className="h-4 w-4" />
              تم الحفظ
            </motion.span>
          )}
        </div>
      </form>
    </div>
  );
}