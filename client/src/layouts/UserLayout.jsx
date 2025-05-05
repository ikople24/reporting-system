import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import UserBottomNav from "@/components/navbar/UserBottomNav";
import LoadingScreen from "@/pages/LoadingScreen";
import Profile from "@/components/navbar/Profile";


const UserLayout = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { signOut } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/sign-in");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-[430px] flex flex-col bg-white min-h-screen relative overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center justify-between p-4 shadow-md bg-white">
          <h1 className="font-bold text-xl">MyApp</h1>
          <Profile />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto mb-16">
          {loading ? <LoadingScreen /> : <Outlet />}
        </div>

        {/* Bottom Navigation */}
        <UserBottomNav />
      </div>
    </div>
  );
};

export default UserLayout;
