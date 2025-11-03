const Message = require("../models/message.model");
const Chat = require("../models/chat.model");

exports.sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId)
    return res.status(400).send("Invalid data");

  try {
    const newMsg = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    let fullMsg = await Message.findById(newMsg._id)
      .populate("sender", "username profilePic")
      .populate("chat");

    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMsg });

    res.status(201).json(fullMsg);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username profilePic")
      .populate("chat");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
