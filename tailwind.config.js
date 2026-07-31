 /*@type {import('tailwindcss').Config}*/
export default{
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        //نفس البالتة تُستخدم في الأنظمة الخمسة كلها (عام/أدمن/مدرس/طالب/توظيف)*/
        primary: {
          DEFAULT: "#2563EB", // blue-600 — نفس لون الروابط النشطة وزر الـ CTA
          dark: "#1D4ED8",
        },
        accent: "#F59E0B", // أمبر — يُستخدم كبديل CTA أو للعروض/التخفيضات
        surface: "#FFFFFF",
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