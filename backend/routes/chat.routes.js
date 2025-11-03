const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const chatController = require("../controller/chat.controller");

// Create or fetch 1-to-1 chat
router.post("/", auth.authUser, chatController.accessChat);

// Fetch all chats of logged-in user
router.get("/", auth.authUser, chatController.fetchChats);

module.exports = router;
