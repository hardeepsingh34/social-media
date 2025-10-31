const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const settingsController = require("../controller/setting.controller");

// Update profile info
router.put("/profile", authMiddleware.authUser, settingsController.updateProfile);

// Update notification preferences
router.put("/preferences", authMiddleware.authUser, settingsController.updatePreferences);

// Change password
router.put("/password", authMiddleware.authUser, settingsController.changePassword);

module.exports = router;
