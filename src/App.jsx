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
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminInstructors from "./pages/admin/AdminInstructors";
import AdminCourses from "./pages/admin/AdminCourses";
import InstructorProfile from "./pages/dashboard/InstructorProfile";
import SuggestCourse from "./pages/dashboard/SuggestCours";
import AdminSuggestions from "./pages/admin/AdminSuggestions";
import InstructorApply from "./pages/InstructorApply";
import InstructorPending from "./pages/InstructorPending";
import StudentCoursesView from "./pages/student/StudentCoursesView";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminSettings from "./pages/admin/AdminSettings";


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
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Route> 

          {/* Standalone Auth Pages (No Navbar/Footer) */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardRoute />}>
            <Route index element={<DashboardHome />} />
            <Route path="courses" element={<StudentCoursesView />} />
            <Route path="students" element={<div>الطلاب</div>} />
            <Route path="schedule" element={<div>الجدول</div>} />
            <Route path="profile" element={<InstructorProfile />} />
            <Route path="suggest-course" element={<SuggestCourse />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />

         <Route path="/instructor/apply" element={<InstructorApply />} />
         <Route path="/instructor/pending" element={<InstructorPending />} />
         {/* Admin Protected Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<DashboardHome />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="instructors" element={<AdminInstructors />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="suggestions" element={<AdminSuggestions />} />
        </Route>
    
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}