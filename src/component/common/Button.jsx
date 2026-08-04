
/**
 * مكون زر موحد يُستخدم بكل أنحاء المشروع (Navbar, Forms, Dashboards...)
 * بدل ما نكرر نفس كلاسات Tailwind بكل مكان.
 *
 * أمثلة استخدام:
 *   <Button>سجل الآن</Button>
 *   <Button variant="outline">تسجيل الدخول</Button>
 *   <Button variant="danger" size="sm">حذف</Button>
 *   <Button loading>جاري الحفظ...</Button>
 */
 
const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  outline:
    "border border-gray-300 text-gray-800 hover:border-primary hover:text-primary bg-transparent",
  accent: "bg-accent text-white hover:brightness-95",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-gray-700 hover:bg-gray-100 bg-transparent",
};
 
const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};
 
export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
  ...rest
}) {
  const isDisabled = disabled || loading;
 
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition
    duration-200 hover:scale-[1.03] active:scale-[0.97]
    disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100`;
 
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}