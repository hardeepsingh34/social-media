import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const handleProfileSave = async () => {
  try {
    await axios.put(`${import.meta.env.VITE_BASE_URL}/settings/profile`, 
      { username, email },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert("✅ Profile updated successfully");
  } catch (err) {
    console.error("Profile update error:", err);
    alert("❌ Failed to update profile");
  }
};

const handlePreferencesSave = async () => {
  try {
    await axios.put(`${import.meta.env.VITE_BASE_URL}/settings/preferences`, 
      { emailNotifications, pushNotifications },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert("✅ Preferences updated successfully");
  } catch (err) {
    console.error("Preferences update error:", err);
    alert("❌ Failed to update preferences");
  }
};

const handlePasswordChange = async () => {
  try {
    await axios.put(`${import.meta.env.VITE_BASE_URL}/settings/password`, 
      { currentPassword, newPassword, confirmPassword },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert("✅ Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    console.error("Password change error:", err);
    alert("❌ Failed to change password");
  }
};


  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:bg-gray-900 dark:text-white p-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Settings
          </h1>

          <div className="space-y-10">
            {/* Profile Section */}
            <SectionCard title="Profile">
              <Input
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            <button onClick={handleProfileSave} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:opacity-90 transition">
  Save Changes
</button>
            </SectionCard>

            {/* Appearance Section */}
            <SectionCard title="Appearance">
              <h2 className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Theme</h2>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:opacity-90 transition"
              >
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </SectionCard>

            {/* Notifications Section */}
            <SectionCard title="Notifications">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span>Email Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                />
                <span>Push Notifications</span>
              </label>
            
<button onClick={handlePreferencesSave} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:opacity-90 transition">
  Update Preferences
</button>
            </SectionCard>

            {/* Security Section */}
            <SectionCard title="Security">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={handlePasswordChange} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:opacity-90 transition">
  Change Password
</button>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

/* --- Reusable Components --- */

const SectionCard = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all hover:shadow-lg">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, type = "text", placeholder, value, onChange }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);