
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import Input from "../component/common/Input";
import Button from "../component/common/Button";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAsAdmin } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    setTimeout(() => {
      const username = form.username.toLowerCase();
      let role = "admin";
      let department = "programming";

      // تحديد الدور والقسم بناءً على اسم المستخدم
      if (username.includes("super")) {
        role = "super_admin";
        department = "all"; // صلاحية كاملة على القسمين
      } else if (username.includes("english") || username.includes("eng")) {
        role = "admin";
        department = "english";
      } else {
        role = "admin";
        department = "programming";
      }

      loginAsAdmin({ username: form.username, role, department });
      setSubmitting(false);
      navigate("/admin");
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
        </div>

        <h1 className="mt-4 text-center font-display text-xl font-bold text-gray-900">
          دخول لوحة الإدارة
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          هذا الدخول مخصص لفريق الإدارة فقط
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <Input
            label="اسم المستخدم"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="مثال: super_admin / admin_prog"
          />
          <Input
            label="كلمة المرور"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <Button type="submit" loading={submitting} className="mt-2">
            دخول
          </Button>
        </form>
      </div>
    </div>
  );
}