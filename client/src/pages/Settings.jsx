import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import FlowFieldBackground from "../components/ui/FlowFieldBackground";
import GlassCard from "../components/ui/GlassCard";
import PageTransition from "../components/ui/PageTransition";
import Footer from "../components/Footer";

function Settings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    try {
      await api.post("/auth/update-password", {
        currentPassword,
        newPassword,
      });

      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen px-6 py-24 text-white">
        <FlowFieldBackground particleCount={320} trailOpacity={0.14} />
        <Navbar />

        <div className="relative z-10 mx-auto max-w-xl py-10">
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold">Account Settings</h1>
                <p className="mt-2 text-slate-400">
                  Update your security settings and change your password.
                </p>
              </div>

              <div className="h-px bg-slate-800" />

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

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password (min 6 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]"
                >
                  Save Changes
                </button>
                
                <Link
                  to="/dashboard"
                  className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white text-center transition hover:bg-slate-800 flex items-center justify-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </GlassCard>
        </div>

        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}

export default Settings;
