import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  Bell,
  Home,
  MessageSquare,
  Search,
  Menu,
  X,
} from "lucide-react";

export default function Navbar({ onLogout, onOpenSidebar, onOpenChats }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (e) {
      return false;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply theme mode and persist preference
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {
      // ignore (e.g., localStorage not available)
    }
  }, [darkMode]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow-md transition-all duration-300">
      {/* ---------- Left: Logo ---------- */}
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-2 rounded-lg">
          <span className="text-white font-bold text-xl">A&</span>
        </div>
        <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent dark:text-white">
          Alice-V
        </h1>
      </div>

      {/* ---------- Middle: Search bar (desktop only) ---------- */}
      <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-1/3">
        <Search className="text-gray-500 dark:text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-full"
        />
      </div>

    {/* ---------- Right: Icons + Profile + Toggle ---------- */}
    <div className="hidden md:flex items-center space-x-4">
  <Link to="/home"><Home className="text-gray-600 dark:text-gray-300 cursor-pointer w-6 h-6 hover:text-pink-500" /></Link>
  <button onClick={() => onOpenChats && onOpenChats()} className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100">
    <MessageSquare className="cursor-pointer w-6 h-6 hover:text-pink-500" />
  </button>
  <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer w-6 h-6 hover:text-pink-500" />

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <Sun className="text-yellow-400 w-5 h-5 animate-spin-slow" />
          ) : (
            <Moon className="text-gray-700 dark:text-gray-300 w-5 h-5" />
          )}
        </button>

        {/* Avatar */}
        <img
          src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg"
          alt="Profile"
          className="w-9 h-9 rounded-full cursor-pointer border-2 border-pink-500"
        />
        {/* Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="ml-2 px-3 py-1 bg-red-500 text-white rounded-full hover:opacity-90 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* ---------- Mobile Hamburger + sidebar open ---------- */}
      <div className="md:hidden flex items-center space-x-2">
        <button
          onClick={() => onOpenSidebar && onOpenSidebar()}
          className="text-gray-700 dark:text-gray-300 p-2"
        >
          <Menu size={24} />
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 dark:text-gray-300 p-2"
        >
          {menuOpen ? <X size={24} /> : <Search size={24} />}
        </button>
      </div>

      {/* ---------- Mobile Menu Drawer ---------- */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 flex flex-col items-center py-6 space-y-5 z-50 transition-all">
          {/* Search in mobile */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-10/12">
            <Search className="text-gray-500 dark:text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-full"
            />
          </div>

          {/* Menu Icons */}
            <div className="flex space-x-6 text-gray-700 dark:text-gray-300">
            <Link to="/home"><Home className="w-6 h-6 hover:text-pink-500" /></Link>
            <button onClick={() => onOpenChats && onOpenChats()} className="p-1 rounded-full">
              <MessageSquare className="w-6 h-6 hover:text-pink-500" />
            </button>
            <Bell className="w-6 h-6 hover:text-pink-500" />
          </div>
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full"
          >
            {darkMode ? (
              <>
                <Sun className="text-yellow-400 w-5 h-5" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Light Mode
                </span>
              </>
            ) : (
              <>
                <Moon className="text-gray-700 dark:text-gray-300 w-5 h-5" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Dark Mode
                </span>
              </>
            )}
          </button>

          {/* Avatar */}
          <img
            src="https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg"
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-pink-500 cursor-pointer"
          />
        </div>
      )}
    </nav>
  );
}
