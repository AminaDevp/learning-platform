import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";
 
export default function MobileDrawer({ open, onClose, links, roleConfig }) {
  const { role, user, logout } = useAuth();
  // الدرور دائماً على جهة "end": يمين في RTL، يسار في LTR.
  // حركة x الفيزيائية لازم تنعكس حسب الاتجاه لأنها مش logical property
  const isRTL = typeof document !== "undefined" && document.documentElement.dir === "rtl";
  const offscreenX = isRTL ? "-100%" : "100%";
 
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* الخلفية المظللة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
 
          {/* الدرور نفسه — inset-inline-end يجعله يخرج من اليمين في RTL
              ومن اليسار تلقائياً في LTR بدون أي شرط إضافي */}
          <motion.aside
            initial={{ x: offscreenX }}
            animate={{ x: 0 }}
            exit={{ x: offscreenX }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 end-0 z-50 h-full w-72 bg-white shadow-xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <span className="font-bold text-gray-800">القائمة</span>
              <button
                onClick={onClose}
                aria-label="إغلاق القائمة"
                className="rounded-lg p-1.5 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
 
            <nav className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
 
            <div className="mt-2 border-t border-gray-100 p-4">
              {role === "guest" ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-800"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
                  >
                    سجل الآن
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="px-3 py-1 text-sm font-semibold text-gray-500">
                    {user?.name}
                  </p>
                  {roleConfig.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className="rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="rounded-lg px-3 py-2 text-start text-sm text-red-600 hover:bg-gray-50"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}