const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Update username/email
exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user._id);

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("❌ updateProfile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update notification preferences
exports.updatePreferences = async (req, res) => {
  try {
    const { emailNotifications, pushNotifications } = req.body;
    const user = await User.findById(req.user._id);

    user.preferences = {
      emailNotifications: !!emailNotifications,
      pushNotifications: !!pushNotifications,
    };

    await user.save();
    res.status(200).json({ message: "Preferences updated successfully", preferences: user.preferences });
  } catch (err) {
    console.error("❌ updatePreferences error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ error: "New passwords do not match" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("❌ changePassword error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
