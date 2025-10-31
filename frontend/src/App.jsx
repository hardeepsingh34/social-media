import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Explore from "./pages/AddPost";
import Sidebar from "./components/Sidebar";


export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [messagesListOpen, setMessagesListOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      // Only check localStorage if "remember" is true
      const remember = localStorage.getItem("remember") === "true";
      return remember && localStorage.getItem("auth") === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("auth", isAuthenticated ? "true" : "false");
    } catch (e) {
      // ignore
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear auth state on logout
    try {
      localStorage.removeItem("auth");
      localStorage.removeItem("remember");
    } catch (e) {
      // ignore
    }
  };

  const handleLogin = (remember = false) => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem("auth", "true");
      localStorage.setItem("remember", remember ? "true" : "false");
    } catch (e) {
      // ignore
    }
  };

  // If not authenticated, only show login route (and redirect others to /)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-all duration-300">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }

  // Authenticated UI: show navbar + main routes
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-all duration-300">
  <Navbar onLogout={handleLogout} onOpenSidebar={() => setMobileSidebarOpen(true)} onOpenChats={() => setMessagesListOpen(true)} />

      {/* Main Content with persistent Sidebar */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex">
          <aside className="hidden lg:block w-60 mr-6">
            <Sidebar />
          </aside>

          {/* Mobile sidebar overlay */}
          {mobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
                <Sidebar />
              </div>
            </div>
          )}

          <main className="flex-1">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
               <Route path="/" element={<Home />} />
              <Route path="/addpost" element={<Explore />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages mobileListOpen={messagesListOpen} setMobileListOpen={setMessagesListOpen} />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
