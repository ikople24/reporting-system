import SidebarProfile from "./SidebarProfile";
import SidebarMenu from "./SidebarMenu";
import SidebarToggle from "./SidebarToggle";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div
    className={`fixed top-0 left-0 h-screen bg-black text-white flex flex-col transition-all duration-300 z-50 ${
      isOpen ? "w-64" : "w-16"
    }`}
  >
    <SidebarProfile isOpen={isOpen} />
    <SidebarMenu isOpen={isOpen} />
    <SidebarToggle toggleSidebar={toggleSidebar} isOpen={isOpen} />
  </div>
);

export default Sidebar;