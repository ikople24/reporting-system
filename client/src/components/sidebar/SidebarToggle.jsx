import { ChevronLeft } from "lucide-react";

const SidebarToggle = ({ toggleSidebar, isOpen }) => (
  

  <button
    onClick={toggleSidebar}
    className="absolute top-4 right-[-12px] bg-black text-white border border-gray-700 rounded-full p-1 hover:bg-gray-800"
    >
    <ChevronLeft
      size={16}
      className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"} block`}
      />
  </button>
  
      
);

export default SidebarToggle;
