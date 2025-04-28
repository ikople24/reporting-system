import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const UserBottomNav = () => {
  const location = useLocation();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  const menus = [
    { label: "Home", icon: <Home size={24} />, path: "/" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white shadow-md flex justify-around py-2">
      {menus.map((item) => (
        <Link key={item.path} to={item.path} className="flex flex-col items-center text-gray-500">
          {item.icon}
          <span
            className={`text-xs mt-1 ${
              location.pathname === item.path ? "text-blue-500 font-semibold" : ""
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default UserBottomNav;
