import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-950/40 py-12 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-300/20 bg-indigo-400/15">
              <GraduationCap size={20} className="text-indigo-200" />
            </span>
            <span className="text-lg font-semibold text-white">Efforvia</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/dashboard" className="transition hover:text-white">Dashboard</Link>
            <Link to="/learning-paths" className="transition hover:text-white">Quests</Link>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Efforvia. Learn. Level up. Repeat.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
