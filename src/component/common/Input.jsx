
/**
 * مكون حقل إدخال موحد (نص أو textarea) — يُستخدم بكل نماذج المشروع
 * (تواصل، تسجيل دخول، حجز...) بدل تكرار نفس التنسيق بكل نموذج.
 *
 * أمثلة استخدام:
 *   <Input label="الاسم" name="name" value={name} onChange={...} />
 *   <Input label="الرسالة" name="message" as="textarea" rows={5} />
 *   <Input label="البريد" type="email" error="بريد غير صالح" />
 */
export default function Input({
  label,
  name,
  as = "input",
  type = "text",
  error,
  className = "",
  ...rest
}) {
  const Tag = as; // "input" أو "textarea"
 
  const baseClasses = `w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-800
    placeholder:text-gray-400 transition
    focus:outline-none focus:ring-2 focus:ring-primary/30
    ${error ? "border-red-400" : "border-gray-300 focus:border-primary"}`;
 
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
 
      <Tag
        id={name}
        name={name}
        type={as === "input" ? type : undefined}
        className={baseClasses}
        {...rest}
      />
 
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}