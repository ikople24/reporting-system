import { useUser } from "@clerk/clerk-react";

const SidebarProfile = ({ isOpen }) => {
  const { user } = useUser();

  return (
    <div
      className={`flex items-center gap-2 p-4 ${
        isOpen ? "justify-start" : "justify-center"
      }`}
    >
      <div className="w-12 min-w-12 flex justify-center">
        {user?.imageUrl && (
          <img
            src={user.imageUrl}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col overflow-hidden">
          <span className="font-semibold text-sm truncate">
            {user?.firstName || "User"}
          </span>
          <span className="text-xs text-gray-500 truncate">
            {user?.primaryEmailAddress?.emailAddress || ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default SidebarProfile;
