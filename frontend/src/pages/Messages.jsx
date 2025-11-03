import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import io from "socket.io-client";
import { UserDataContext } from "../../context/UserContext";

const dummyChats = [];
const SOCKET_URL = import.meta.env.VITE_BASE_URL; // example: http://localhost:4000
let socket;


const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [messages, setMessages] = useState([]);
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [input, setInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const scrollRef = useRef(null);
  const {user} = useContext(UserDataContext);

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/allusers`);
      setAllUsers(response.data);
      } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  };
  fetchPosts();
}, []);
  // ✅ Connect to Socket
  useEffect(() => {
    socket = io(SOCKET_URL);
    if (user) socket.emit("setup", user);

    socket.on("connected", () => console.log("🟢 Socket Connected"));

    return () => {
      socket.disconnect();
    };
  }, []);

useEffect(() => {
  if (selectedChat && user) {
    socket.emit("joinRoom", {
      userId: user._id,
      otherUserId: selectedChat._id
    });
  }
}, [selectedChat]);

useEffect(() => {
  socket.on("receiveMessage", (newMsg) => {
    setMessages(prev => [...prev, newMsg]);
  });

  return () => socket.off("receiveMessage");
}, []);

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedChat]);

  // 🔥 When a chat is selected, join the room
  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("join chat", selectedChat._id);
  }, [selectedChat]);

    // 📥 Receive real-time messages
  useEffect(() => {
    socket.on("message received", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
  }, []);

  // ✉️ Send Message
 const handleSend = (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const newMsg = {
    sender: user._id,
    receiver: selectedChat._id,
    message: input.trim()
  };

  setMessages(m => [...m, newMsg]); // show immediately for sender
  socket.emit("sendMessage", newMsg);

  setInput("");
};



  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      <main className="flex bg-transparent">
        {/* Conversations list (left) */}
  <aside className="hidden md:flex md:flex-col w-80 bg-white border rounded-l-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="text-lg font-semibold">Messages</div>
            <div className="mt-3">
              <input
                className="w-full px-3 py-2 rounded-lg bg-gray-100 text-sm placeholder-gray-500 focus:outline-none"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
           {allUsers.map((user) => (
  <div
    key={user._id}
    onClick={() => {
      setSelectedChat(user);
      setMobileListOpen(false);
    }}
    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b ${
      selectedChat?._id === user._id ? "bg-gray-100" : ""
    }`}
  >
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
      {user.username.slice(0, 1).toUpperCase()}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-800">{user.username}</div>
      </div>
    </div>
  </div>
))}

          </div>
        </aside>

        {/* Chat panel (right) */}
        <section className="flex-1 flex flex-col bg-white border rounded-xl shadow-sm ml-0 md:ml-4 h-[72vh] overflow-hidden">
          {/* Header */}
          <header className="flex items-center gap-3 p-4 border-b">
            {/* mobile list toggle */}
            <button
              className="md:hidden mr-2 p-2"
              onClick={() => setMobileListOpen(true)}
              aria-label="Open conversations"
            >
              ☰
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
              {selectedChat?.username.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{selectedChat?.username}</div>
              <div className="text-xs text-gray-400">Active now</div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Info</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">More</button>
            </div>
          </header>

          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-4">
            {messages.map((msg) => (
              <div key={msg?.id} className={`flex ${msg?.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] whitespace-pre-wrap break-words ${
                    msg.sender === "me"
                      ? "text-white bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 shadow-lg"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="text-sm">{msg?.content}</div>
                  <div className={`text-[10px] mt-1 ${msg?.sender === "me" ? "text-white/80" : "text-gray-400"}`}>
                    {msg.time || ""}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <form onSubmit={handleSend} className="p-4 border-t flex items-center gap-3">
            <button type="button" className="text-2xl">😊</button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              className="flex-1 px-4 py-2 rounded-full border bg-gray-50 focus:outline-none"
            />
            <label className="cursor-pointer">
              <input type="file" className="hidden" />
              <span className="text-xl">📷</span>
            </label>
            <button
              type="submit"
              className={`px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90`}
            >
              Send
            </button>
          </form>
        </section>
        {/* Mobile overlay for conversations */}
        {mobileListOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileListOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg overflow-auto">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="font-semibold">Conversations</div>
                <button onClick={() => setMobileListOpen(false)} className="px-2">✕</button>
              </div>
              <div className="p-2">
                {dummyChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      setSelectedChat(chat);
                      setMobileListOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b ${
                      selectedChat?.id === chat.id ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                      {chat?.username.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{chat?.username}</div>
                      <div className="text-sm text-gray-500">{chat.lastMessage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;