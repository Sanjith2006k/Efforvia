import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import api from "../services/api";
import FlowFieldBackground from "../components/ui/FlowFieldBackground";
import GlassCard from "../components/ui/GlassCard";
import PageTransition from "../components/ui/PageTransition";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isNotRegistered, setIsNotRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsNotRegistered(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await api.post("/auth/forgot-password", {
        email: email.trim(),
        currentPassword,
        newPassword,
      });

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const msg = err.response?.data?.message || "Password reset failed.";
      setError(msg);
      if (err.response?.status === 404) {
        setIsNotRegistered(true);
      }
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
            <h1 className="text-3xl font-bold text-white mb-1 text-center">Reset Password</h1>

            <p className="text-center text-sm text-slate-400">
              Verify your identity with your current password to set a new one.
            </p>

            {error && (
              <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {success}
              </p>
            )}

            {isNotRegistered ? (
              <div className="mt-2 flex flex-col gap-3">
                <p className="text-center text-sm text-amber-200">
                  Would you like to create a new account instead?
                </p>
                <Link
                  to="/register"
                  className="rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white text-center shadow-[0_8px_0_#78350f] transition-all hover:-translate-y-1 hover:bg-amber-500 hover:shadow-[0_12px_0_#78350f] active:translate-y-1 active:shadow-[0_4px_0_#78350f]"
                >
                  Register Now
                </Link>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  required
                />

                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  required
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  required
                />

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]"
                >
                  Reset Password
                </button>
              </>
            )}

            <p className="text-center text-sm text-slate-400">
              Remember your password?{" "}
              <Link to="/login" className="text-indigo-300 hover:text-white">
                Back to Login
              </Link>
            </p>
          </form>
        </GlassCard>
      </div>
    </PageTransition>
  );
}

export default ForgotPassword;
