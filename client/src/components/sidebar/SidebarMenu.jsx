import { useUser } from "@clerk/clerk-react";
import SidebarItem from "./SidebarItem";
import { LayoutDashboard, Settings, Users, Database } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser();
  const location = useLocation();
  const role = user?.publicMetadata?.role || "user";

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin", roles: ["admin", "superadmin", "user"] },
    { label: "Settings", icon: Settings, path: "/admin/settings", roles: ["admin", "superadmin"] },
    { label: "Manage Users", icon: Users, path: "/admin/manage-users", roles: ["superadmin"] },
    { label: "จัดการข้อมูล", icon: Database, path: "/admin/listprobs", roles: ["admin", "superadmin"] },
  ];

  const visibleMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex bg-background text-foreground flex-col h-screen justify-between ">
      <nav className="flex flex-col p-4 space-y-2">
        {visibleMenu.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            isOpen={isOpen}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      {/* 👉 ปุ่ม toggle อยู่ล่างสุด */}
      <div className="p-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-full p-2 rounded hover:bg-blue-950 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Sun className="hover:text-yellow-500" size={20} /> : <Moon className="hover:text-yellow-200" size={20} />}
          {isOpen && <span className="ml-3 text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;