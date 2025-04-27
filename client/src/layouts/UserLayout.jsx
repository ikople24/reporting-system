import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import SkeletonLoader from "../components/SkeletonLoader";
import UserBottomNav from "@/components/navbar/UserBottomNav";

const UserLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800); // Loading 0.8 วินาที
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-[430px] flex flex-col bg-white min-h-screen relative overflow-hidden">
        {/* Topbar */}
        <div className="p-4 shadow-md text-center font-bold text-xl bg-white">
          MyApp
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto mb-16">
          {loading ? <SkeletonLoader /> : <Outlet />}
        </div>

        {/* Bottom Navigation */}
        <UserBottomNav />
      </div>
    </div>
  );
};

export default UserLayout;
