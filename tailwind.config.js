 /*@type {import('tailwindcss').Config}*/
export default{
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // الهوية البصرية الجديدة — نفس أسماء الكلاسات القديمة (primary/accent/surface)
        // بس بقيم جديدة، عشان أي مكون سبق وكتبناه (Navbar, Footer, Button, DashboardLayout)
        // ياخذ الألوان الجديدة تلقائياً بدون ما نلمس كوده.
        primary: {
          DEFAULT: "#1B1B3A", // كحلي غامق دافئ — بدل blue-600 الافتراضي
          dark: "#12122A",
        },
        accent: "#E8A94C", // ذهبي دافئ — يرمز للإنجاز والشهادات، بدل الأمبر العادي
        secondary: "#2A9D8F", // تركواز — لتمييز عناصر "المدرس" لاحقاً (Navbar role icon مثلاً)
        surface: "#FBF9F6", // أبيض دافئ (مو أبيض ناصع) — أريح للعين بصفحات القراءة الطويلة
      },
      fontFamily: {
        display: ["Cairo", "sans-serif"], // خط العناوين (يدعم العربية جيداً)
        body: ["Inter", "sans-serif"], // خط النصوص
      },
    },
  },
  // يضيف كلاسات logical إضافية (ms-/me-) — Tailwind الحديث يدعم start/end/ps/pe مباشرة أيضاً
  plugins: [],

};