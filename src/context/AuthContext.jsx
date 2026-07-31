import { createContext, useContext, useState } from "react";
 
// الأدوار الممكنة: "guest" | "student" | "instructor" | "admin"
const AuthContext = createContext(null);
 
const MOCK_USERS = {
  guest: null,
  student: { name: "سارة أحمد", role: "student", avatar: null },
  instructor: { name: "أ. كريم بن علي", role: "instructor", avatar: null },
  admin: { name: "المشرف العام", role: "admin", avatar: null },
};
 
export function AuthProvider({ children }) {
  // غيّر المفتاح هنا يدوياً أثناء التطوير لتجربة كل حالة: guest / student / instructor / admin
  const [user, setUser] = useState(MOCK_USERS.guest);
 
  const login = (role = "student") => setUser(MOCK_USERS[role]);
  const logout = () => setUser(null);
 
  const value = {
    user,
    role: user?.role || "guest",
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
 
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth يجب أن يُستخدم داخل AuthProvider");
  return ctx;
}