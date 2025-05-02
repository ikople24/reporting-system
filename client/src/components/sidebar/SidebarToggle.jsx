const SidebarToggle = ({ toggleSidebar }) => (
  <div className="flex justify-end p-2 border-b">
    <button onClick={toggleSidebar} className="text-gray-600 text-lg">☰</button>
  </div>
);

export default SidebarToggle;
