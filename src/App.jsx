import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./component/common/layout/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register"; 
import Login from "./pages/Login"; 
// ملاحظة: DashboardLayout و AdminLayout ما انضافوش هون بعد لأن صفحاتهم
// (Student/Instructor/Admin dashboards) لسه ما انبنتش. رح نضيفهم كـ
// <Route path="/dashboard" element={<DashboardLayout .../>}> لما تجهز.
 
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route> 
       {/* صفحات بدون Navbar/Footer (خارج PublicLayout) */}
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
 