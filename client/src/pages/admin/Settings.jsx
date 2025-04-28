import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";


const Settings = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const role = user?.publicMetadata?.role || "user";

      if (role !== "superadmin") {
        navigate("/403", { replace: true });
      } else {
        setCheckingRole(false);
      }
    }
  }, [isLoaded, user, navigate]);

  if (checkingRole) {
    return <LoadingScreen />; // แสดง spinner ตอนเช็ก role
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p>Manage system settings here (Only SuperAdmin).</p>
    </div>
  );
};

export default Settings;