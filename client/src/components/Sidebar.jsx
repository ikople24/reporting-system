import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, Users } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user } = useUser();

  const role = user?.publicMetadata?.role || "user"; // ถ้าไม่มีก็ default เป็น user

  // เมนูทุก role
  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin", roles: ["admin", "superadmin", "user"] },
    { label: "Settings", icon: <Settings size={20} />, path: "/admin/settings", roles: ["admin", "superadmin"] },
    { label: "Manage Users", icon: <Users size={20} />, path: "/admin/manage-users", roles: ["superadmin"] },
  ];

  // Filter เมนูตาม role
  const visibleMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className={`${isOpen ? "w-64" : "w-16"} bg-white shadow-md transition-all`}>
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">{isOpen ? "Admin" : "A"}</span>
        <button onClick={toggleSidebar} className="text-gray-600">
          ☰
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        {visibleMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
