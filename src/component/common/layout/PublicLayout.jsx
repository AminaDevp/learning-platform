import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
 
// يُستخدم لكل الصفحات العامة (Home, About, Contact...)
// أي صفحة عامة جديدة تُضاف لاحقاً بـ App.jsx جوا نفس <Route> بتاخذ هذا الشكل تلقائياً
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
 