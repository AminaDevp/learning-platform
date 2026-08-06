import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./component/common/layout/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register"; 
import Login from "./pages/Login"; 
import DashboardRoute from "./component/common/DashboardRoute";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AdminRoute from "./component/common/AdminRoute";
// Admin Sub-Views (Placeholders or imports)
const AdminCourses = () => <div className="p-4 bg-white rounded-xl shadow">إدارة الكورسات</div>;
const AdminInstructors = () => <div className="p-4 bg-white rounded-xl shadow">إدارة المدرسين</div>;
const AdminStudents = () => <div className="p-4 bg-white rounded-xl shadow">إدارة الطلاب</div>;
const AdminSettings = () => <div className="p-4 bg-white rounded-xl shadow">إعدادات النظام</div>;
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages with Navbar & Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route> 

          {/* Standalone Auth Pages (No Navbar/Footer) */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardRoute />}>
            <Route index element={<DashboardHome />} />
            <Route path="courses" element={<div>الكورسات</div>} />
            <Route path="students" element={<div>الطلاب</div>} />
            <Route path="schedule" element={<div>الجدول</div>} />
          </Route>
{/* Admin Protected Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<DashboardHome />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="instructors" element={<AdminInstructors />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="settings" element={<AdminSettings />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}