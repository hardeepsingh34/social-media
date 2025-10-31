import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserDataContext } from "../../context/UserContext";
import axios from "axios";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserDataContext);

  const [tiltStyle, setTiltStyle] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }

      if (onLogin) onLogin(rememberMe);
      localStorage.setItem("auth", "true");
      localStorage.setItem("remember", rememberMe ? "true" : "false");

      setEmail('');
      setPassword('');
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed! Please check your credentials or server.");
    }
  };

  // Tilt Effects
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / 15).toFixed(2);
    const rotateY = ((rect.width / 2 - x) / 15).toFixed(2);

    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.6s ease-out",
    });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(58.2deg, rgba(40,91,212,0.73) -3%, rgba(171,53,163,0.45) 49.3%, rgba(255,204,112,0.37) 97.7%)",
      }}
    >
      {/* Floating effects ... (same as before) */}

      <div
        className="relative max-w-sm w-full rounded-[35px] p-[2px] bg-gradient-to-r from-indigo-400/60 via-purple-400/60 to-pink-400/60 shadow-[0_0_50px_rgba(255,255,255,0.4)]"
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="rounded-[35px] p-8 bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(171,53,163,0.4)]">
          <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-6">
            Log In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-300 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-300 outline-none"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-white/80 text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-purple-400"
                />
                Remember me
              </label>
              <div className="text-sm text-blue-200 hover:text-white cursor-pointer transition">
                Forgot Password?
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-full py-3 shadow-[0_0_20px_rgba(99,102,241,0.8)] hover:scale-105 hover:shadow-[0_0_35px_rgba(99,102,241,1)] transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-white/80 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-300 hover:text-white transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
