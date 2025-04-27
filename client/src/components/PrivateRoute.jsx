import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen duration-500">
        <p>Loading...</p>
      </div>
    );
  }
  const userRole = user?.publicMetadata?.role; // ดึง role จาก Clerk (หรือ custom field)

  if (allowedRoles.includes(userRole)) {
    console.log("you login", user.publicMetadata.role);
    return children;
  } else {
    return <Navigate to="/403" replace />;
  }
};

export default PrivateRoute;
