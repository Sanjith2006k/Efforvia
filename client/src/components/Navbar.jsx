import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Trophy, Settings, MessageSquare } from "lucide-react";

import Button from "./ui/Button";
import { AuthContext } from "../context/AuthContextValue";
import FeedbackModal from "./FeedbackModal";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full px-4 py-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-slate-950/65 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            : "border-white/5 bg-slate-950/20 backdrop-blur-md"
        }`}
      >
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

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/learning-paths"
                className="hidden items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 font-medium text-amber-100 transition hover:bg-amber-300/15 md:flex"
              >
                <Trophy size={18} />
                Quests
              </Link>

              <Link to="/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>

              <Link
                to="/settings"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 transition-all hover:-translate-y-1 hover:border-slate-500 active:translate-y-1 hover:shadow-[0_4px_0_#1e1b4b]"
                title="Settings"
              >
                <Settings size={20} />
              </Link>

              <button
                type="button"
                onClick={() => setIsFeedbackOpen(true)}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 transition-all hover:-translate-y-1 hover:border-indigo-500 hover:shadow-[0_4px_0_#1e1b4b] active:translate-y-1"
                title="Send Feedback"
              >
                <MessageSquare size={20} />
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 font-medium text-white shadow-[0_8px_0_#1e1b4b] transition-all hover:-translate-y-1 hover:shadow-[0_12px_0_#1e1b4b] active:translate-y-1 active:shadow-[0_4px_0_#1e1b4b]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>

              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </nav>
  );
}

export default Navbar;
