const Chat = require("../models/chat.model");
const User = require("../models/user.model");

exports.accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).send("UserId param not sent");

  const loggedUser = req.user._id;

  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [loggedUser, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat) return res.status(200).json(chat);

    // no chat exists → create new one
    const newChat = await Chat.create({
      chatName: "private",
      isGroupChat: false,
      users: [loggedUser, userId],
    });

    const fullChat = await Chat.findById(newChat._id).populate("users", "-password");
    res.status(201).json(fullChat);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.fetchChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ users: { $in: [userId] } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
