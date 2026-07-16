import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import FlowFieldBackground from "../components/ui/FlowFieldBackground";
import GlassCard from "../components/ui/GlassCard";
import PageTransition from "../components/ui/PageTransition";
import ServerWakeup from "../components/ui/ServerWakeup";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isWakingServer, setIsWakingServer] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    let timeoutId;
    if (!sessionStorage.getItem("serverReady")) {
      timeoutId = setTimeout(() => {
        setIsWakingServer(true);
      }, 1500);
    }

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (timeoutId) clearTimeout(timeoutId);
      sessionStorage.setItem("serverReady", "true");
      setIsWakingServer(false);

      navigate("/login");
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
      setIsWakingServer(false);
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        setError("Server took too long to respond. Please try again.");
      } else {
        setError(error.response?.data?.message || "Registration failed");
      }
    }
  };

  if (isWakingServer) {
    return <ServerWakeup />;
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center px-6">
        <FlowFieldBackground />

        <GlassCard className="relative z-10 w-full max-w-md p-8">
          <div className="mb-6 flex flex-col items-center justify-center gap-2">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-400/15 shadow-[0_8px_0_#1e1b4b]">
                <GraduationCap size={25} className="text-indigo-200" />
              </span>
              <span>
                <span className="block text-xl font-semibold text-white">
                  Efforvia
                </span>
                <span className="hidden text-xs text-indigo-200 sm:block">
                  Learn. Level up. Repeat.
                </span>
              </span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold text-white">Create Account</h1>

            <p className="text-slate-400">
              Save your roadmap and track progress from one dashboard.
            </p>

            {error && (
              <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              required
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-2"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-indigo-400 hover:text-white" />
                ) : (
                  <Eye className="h-4 w-4 text-indigo-400 hover:text-white" />
                )}
              </button>
            </div>

            <div className="relative w-full mt-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-2"
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-indigo-400 hover:text-white" />
                ) : (
                  <Eye className="h-4 w-4 text-indigo-400 hover:text-white" />
                )}
              </button>
            </div>

            <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]">
              Register
            </button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-300 hover:text-white">
                Login
              </Link>
            </p>
          </form>
        </GlassCard>
      </div>
    </PageTransition>
  );
}

export default Register;