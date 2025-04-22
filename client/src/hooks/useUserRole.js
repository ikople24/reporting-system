import { useUser } from "@clerk/clerk-react";

const useUserRole = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return { role: null, user: null };

  const role = user.publicMetadata.role || 'user';

  return { role, user };
};

export default useUserRole;
