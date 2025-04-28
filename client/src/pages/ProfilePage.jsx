import { useState } from "react";
import { createProfile } from "../api/profile";
import useAuthToken from "../hooks/useAuthToken";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [name, setName] = useState('');
  const fetchToken = useAuthToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await fetchToken();

    await createProfile(token, {
      name, // <-- ตัวอย่าง payload
    });

    alert("Profile Created Successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
      />
      <Button  type="submit">Save Profile</Button>
    </form>
  );
};

export default ProfilePage;
