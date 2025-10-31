import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, User, MessageCircle, Bell, Settings, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = ({ onLinkClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Add Post", path: "/addpost", icon: <Compass size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Messages", path: "/messages", icon: <MessageCircle size={20} /> },
    { name: "Notifications", path: "/notifications", icon: <Bell size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`relative h-screen px-4 py-6 overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl transition-all duration-500 rounded-2xl
      ${collapsed ? "w-20" : "w-64"}`}
    >

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 bg-white/60 backdrop-blur-md border border-gray-300 shadow-md w-6 h-6 flex items-center justify-center rounded-full hover:scale-110 transition"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo */}
      {!collapsed && (
        <h1 className="text-2xl font-extrabold tracking-wide mb-6 text-gray-900">❤️</h1>
      )}

      {/* Nav Links */}
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => onLinkClick && onLinkClick()}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition cursor-pointer glow-hover tilt-hover
              ${isActive ? "bg-indigo-500 text-white shadow-lg" : "text-gray-800 hover:bg-white/40"} 
              ${collapsed ? "justify-center" : "justify-start"}`
            }
          >
            {link.icon}
            {!collapsed && <span className="text-base font-medium">{link.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
