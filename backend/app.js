const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.send("home page");
});

// Socket
const { initChatSocket } = require("./socket/chat.socket");
initChatSocket(server);

module.exports = app;