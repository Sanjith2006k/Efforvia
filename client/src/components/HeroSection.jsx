import { useContext } from "react";
import { BookOpen, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";

import FlowFieldBackground from "./ui/FlowFieldBackground";

function HeroSection() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleStartLearning = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative min-h-screen">
      <FlowFieldBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="backdrop-blur-xl border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-8">
          <span className="text-indigo-300">Learn Faster With AI</span>
        </div>

        <h1 className="text-7xl md:text-8xl font-bold text-white max-w-6xl leading-tight">
          Learn Anything.
          <br />
          Build Your Future.
        </h1>

        <p className="text-xl text-gray-300 mt-8 max-w-3xl">
          Curated YouTube lectures, notes, roadmaps, interview preparation and
          project-based learning.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={handleStartLearning}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]"
          >
            <LogIn size={18} />
            Start Learning
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3 font-semibold text-white backdrop-blur-lg transition hover:bg-slate-800/70"
          >
            <BookOpen size={18} />
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
