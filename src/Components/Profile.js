import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7206/api/User/${username}`
      );
      setProfile(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Error fetching profile. Please try again later.");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProfile();
  };

  return (
    <div>
      <h1>Enter Username to Fetch Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <button type="submit">Fetch Profile</button>
      </form>
      {error && <p>{error}</p>}
      {profile && (
        <div>
          <h2>User Profile</h2>
          <p>Email: {profile.email}</p>
          <p>User ID: {profile.userId}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
