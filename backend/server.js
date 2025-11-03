const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const UserRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes")
const settingsRoutes = require("./routes/setting.routes"); 
const dotenv = require("dotenv");
dotenv.config();
const connectToDb = require("./db/db")
const cookieParser = require('cookie-parser');

connectToDb();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// ✅ Your routes here
app.use('/user', UserRoutes);
app.use("/post", PostRoutes);
app.use("/settings", settingsRoutes);
// Routes
app.use("/api/chats", require("./routes/chat.routes"));
app.use("/api/messages", require("./routes/message.routes"));
// app.use("/api/chat", chatRoutes)
// app.use("/api/message", messageRoutes)

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// 🌐 Socket.io Logic
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // 1️⃣ User Setup
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // 2️⃣ Join Chat Room
  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log("User joined chat:", chatId);
  });

  // 3️⃣ New Message
  socket.on("new message", (message) => {
    const chat = message.chat;
    if (!chat.users) return;

    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.to(user._id).emit("message received", message);
    });
  });

  // 4️⃣ Typing Indicator
  socket.on("typing", (chatId) => socket.to(chatId).emit("typing"));
  socket.on("stop typing", (chatId) => socket.to(chatId).emit("stop typing"));

  // 5️⃣ Disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(4000, () => console.log("✅ Server running on port 4000"));
