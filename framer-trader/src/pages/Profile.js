import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaCamera, FaMoon, FaSun } from "react-icons/fa"; // Icons
import "../styles/Profile.css"; // Custom styles

const Profile = () => {
  const { currentUser } = useAuth(); // Get user data from context
  const [name, setName] = useState("John Doe");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/100");
  const [darkMode, setDarkMode] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className={`profile-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Profile Header */}
      <div className="profile-card">
        <label htmlFor="avatarInput" className="avatar-upload">
          <img src={avatar} alt="User Avatar" className="profile-avatar" />
          <div className="upload-icon">
            <FaCamera />
          </div>
        </label>
        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          onChange={handleAvatarChange}
          hidden
        />
        <h2>{name}</h2>
        <p className="user-email">{currentUser?.email || "guest@domain.com"}</p>
        <p className="user-role">Role: Trader</p>
      </div>

      {/* Profile Details */}
      <div className="profile-section">
        <h3>✏️ Edit Profile</h3>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Security Section */}
      <div className="profile-section">
        <h3>🔑 Change Password</h3>
        <input type="password" placeholder="New Password" />
        <input type="password" placeholder="Confirm Password" />
        <button className="save-button">Save Changes</button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="profile-section dark-mode-toggle">
        <h3>{darkMode ? "🌙 Dark Mode Enabled" : "☀️ Light Mode Enabled"}</h3>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span className="slider">{darkMode ? <FaMoon /> : <FaSun />}</span>
        </label>
      </div>
    </div>
  );
};

export default Profile;
