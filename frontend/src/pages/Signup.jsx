import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../context/UserContext";

export default function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useContext(UserDataContext);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const newUser = { username, email, password };
    console.log(newUser);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/registor`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem("auth", "true");
        if (onSignup) onSignup();
        navigate("/home");
      }

      // clear fields
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e8e8e8]">
      <div className="max-w-sm w-full bg-gradient-to-b from-white to-[#f4f7fb] rounded-[40px] p-8 border-[5px] border-white shadow-[0_30px_30px_rgba(133,189,215,0.9)]">
        <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-semibold rounded-full py-3 shadow-md hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">Or Sign up with</p>

        <div className="flex justify-center gap-5 mt-4">
          {[
            "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
            "https://cdn-icons-png.flaticon.com/512/733/733547.png",
            "https://cdn-icons-png.flaticon.com/512/733/733614.png",
          ].map((src, i) => (
            <button key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
              <img src={src} alt="social" className="w-5" />
            </button>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-pink-500 hover:text-pink-600 font-medium">
            Sign In
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          By signing up, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}
