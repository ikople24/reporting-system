import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react"; // ใช้ไอคอน Home

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="font-semibold text-xl">Admin Panel</h1>

          <div className="flex items-center gap-4">
            {/* ปุ่มกลับ Home */}
            <button
              onClick={handleGoHome}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <Home size={18} />
              กลับหน้าหลัก
            </button>
          </div>
        </div>

        {/* Pages */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
