import SidebarItem from "./SidebarItem";
import { LayoutDashboard, Settings, Users, Database } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const SidebarMenu = ({ isOpen }) => {
  const { user } = useUser();
  const location = useLocation();
  const role = user?.publicMetadata?.role || "user";

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin", roles: ["admin", "superadmin", "user"] },
    { label: "Settings", icon: Settings, path: "/admin/settings", roles: ["admin", "superadmin"] },
    { label: "Manage Users", icon: Users, path: "/admin/manage-users", roles: ["superadmin"] },
    { label: "จัดการข้อมูล", icon: Database, path: "/admin/listprobs", roles: ["admin", "superadmin"] },
  ];

  const visibleMenu = menuItems.filter(item => item.roles.includes(role));

  return (
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
  );
};

export default SidebarMenu;
