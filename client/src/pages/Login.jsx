import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import FlowFieldBackground from "../components/ui/FlowFieldBackground";
import GlassCard from "../components/ui/GlassCard";
import PageTransition from "../components/ui/PageTransition";

function Login() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Input Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      login(response.data.user, response.data.token);
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

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
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>

            <p className="text-slate-400">
              Continue your learning journey
            </p>

            {error && (
              <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              required
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="text-right -mt-2">
              <Link to="/forgot-password" className="text-sm text-indigo-300 hover:text-white">
                Forgot password?
              </Link>
            </div>

            <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]">
              Login
            </button>

            <p className="text-center text-sm text-slate-400">
              New here?{" "}
              <Link to="/register" className="text-indigo-300 hover:text-white">
                Create an account
              </Link>
            </p>
          </form>
        </GlassCard>
      </div>
    </PageTransition>
  );
}

export default Login;
