const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const messageController = require("../controller/message.controller");

// Send message
router.post("/", auth.authUser, messageController.sendMessage);

// Get all messages of a chat
router.get("/:chatId", auth.authUser, messageController.getMessages);

module.exports = router;
