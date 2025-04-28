import { useAuth } from "@clerk/clerk-react";

const useAuthToken = () => {
  const { getToken } = useAuth();

  const fetchToken = async () => {
    const token = await getToken();
    return token;
  };

  return fetchToken;
};

export default useAuthToken;