import useUserRole from "@/hooks/useUserRole";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { CircleUser, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // <-- ใช้ Framer Motion

const Profile = () => {
  const { role, user } = useUserRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoAdmin = () => {
    navigate("/admin");
    setMenuOpen(false);
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* ยังไม่ได้ล็อกอิน */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <CircleUser size={28} />
          </button>
        </SignInButton>
      </SignedOut>

      {/* ล็อกอินแล้ว */}
      <SignedIn>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
              {user?.firstName?.charAt(0) || "U"}
            </div>
          )}
          <div className="flex flex-col text-sm">
            <span className="font-semibold">{user?.firstName ?? "Guest"}</span>
            <span
              className={`text-xs ${
                role === "superadmin"
                  ? "text-blue-600"
                  : role === "admin"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {role}
            </span>
          </div>
        </div>

        {/* Dropdown Menu Animated */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-40 bg-white shadow-md rounded z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Admin menu */}
              {(role === "admin" || role === "superadmin") && (
                <button
                  onClick={handleGoAdmin}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <Settings size={18} />
                  ไปหน้า Admin
                </button>
              )}

              {/* Logout */}
              <SignOutButton>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </SignOutButton>
            </motion.div>
          )}
        </AnimatePresence>
      </SignedIn>
    </div>
  );
};

export default Profile;
