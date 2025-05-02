import { useUser } from "@clerk/clerk-react";

const SidebarProfile = ({ isOpen }) => {
  const { user } = useUser();
  return (
    <div className="flex items-center p-4 border-b gap-2">
      {user?.imageUrl && (
        <img src={user.imageUrl} alt="profile" className="w-10 h-10 rounded-full object-cover" />
      )}
      {isOpen && (
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{user?.firstName || "User"}</span>
          <span className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress || ""}</span>
        </div>
      )}
    </div>
  );
};

export default SidebarProfile;
