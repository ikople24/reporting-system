import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleGoHome = () => navigate("/");

  return (
    <div>
      {/* Sidebar fixed */}
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Main Content: มี padding-left ตามความกว้าง Sidebar */}
      <div className={`min-h-screen transition-all duration-300 ${isOpen ? "pl-64" : "pl-16"}`}>

        {/* Topbar */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md text-foreground shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="font-semibold text-xl ">Admin Panel</h1>
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            <Home size={18} />
            กลับหน้าหลัก
          </button>
        </div>

        {/* Pages */}
        <div className="p-6 overflow-auto min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;