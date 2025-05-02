import SidebarProfile from "./SidebarProfile";
import SidebarMenu from "./SidebarMenu";
import SidebarToggle from "./SidebarToggle";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`${isOpen ? "w-64" : "w-16"} bg-white shadow-md transition-all h-screen`}>
    <SidebarProfile isOpen={isOpen} />
    <SidebarToggle toggleSidebar={toggleSidebar} />
    <SidebarMenu isOpen={isOpen} />
  </div>
);

export default Sidebar;

