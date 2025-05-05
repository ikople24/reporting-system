import { Link } from "react-router-dom";

const SidebarItem = ({ item, isOpen, isActive }) => (
  <Link
    to={item.path}
    className={`flex items-center gap-3 p-2 rounded ${
      isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200 hover:text-black"
    }`}
  >
    <item.icon size={20} />
    {isOpen && <span>{item.label}</span>}
  </Link>
);

export default SidebarItem;
