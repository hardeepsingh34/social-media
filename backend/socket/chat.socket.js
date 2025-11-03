const { Server } = require("socket.io");

let io;

function initChatSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);
    
      socket.on("joinRoom", ({ userId, otherUserId }) => {
    const roomId = [userId, otherUserId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", ({ sender, receiver, message }) => {
    const roomId = [sender, receiver].sort().join("_");

    io.to(roomId).emit("receiveMessage", {
      sender,
      message,
      time: new Date()
    });
  });

    // Typing indicator
    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("typing");
    });

    socket.on("stop_typing", (chatId) => {
      socket.to(chatId).emit("stop_typing");
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

module.exports = { initChatSocket, io };
