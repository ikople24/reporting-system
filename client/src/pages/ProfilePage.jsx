import { useState } from "react";
import { createProfile } from "../api/profile";
import useAuthToken from "../hooks/useAuthToken";

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
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
      />
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default ProfilePage;
