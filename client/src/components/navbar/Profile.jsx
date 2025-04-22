import useUserRole from "@/hooks/useUserRole";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { CircleUser } from "lucide-react";

const Profile = () => {
  const { role, user } = useUserRole();

  return (
    <div className="flex items-center gap-2">
      {/* กรณียังไม่ได้ล็อกอิน */}
      <SignedOut>
        <SignInButton mode="modal">
          <button>
            <CircleUser />
          </button>
        </SignInButton>
      </SignedOut>

      {/* กรณีล็อกอินแล้ว */}
      <SignedIn>
        <div className="text-sm">
          <strong>
            {role === "superadmin" && <p>คุณเป็น Super Admin</p>}
            {role === "admin" && <p>คุณเป็น Admin</p>}
            {role === "user" && <p>คุณเป็น User</p>}
            <span>{user?.firstName ?? "ไม่พบชื่อ"}</span>
          </strong>
        </div>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Profile;
