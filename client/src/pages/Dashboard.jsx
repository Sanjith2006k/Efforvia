import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Flame,
  LogOut,
  Medal,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Code2,
  Terminal,
  Cpu,
  Database,
  Boxes,
  Network,
  Palette,
  FileCode2,
  Workflow,
  Binary,
  Shield,
  GitBranch,
  Cloud,
  BarChart3,
  Globe,
} from "lucide-react";
import { AuthContext } from "../context/AuthContextValue";
import Navbar from "../components/Navbar";
import FlowFieldBackground from "../components/ui/FlowFieldBackground";
import Footer from "../components/Footer";
import PageTransition from "../components/ui/PageTransition";
import { getLearningPaths } from "../services/learningService";

const suggestedTopics = [
  "React",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cyber Security",
  "Data Science",
  "Web Development",
  "Python",
  "DevOps",
];

const moreCourses = [
  { label: "JavaScript", icon: Code2, color: "text-yellow-400" },
  { label: "Python", icon: Terminal, color: "text-blue-400" },
  { label: "Node.js", icon: Cpu, color: "text-emerald-400" },
  { label: "MongoDB", icon: Database, color: "text-green-500" },
  { label: "Docker", icon: Boxes, color: "text-sky-400" },
  { label: "Kubernetes", icon: Network, color: "text-indigo-400" },
  { label: "UI UX Design", icon: Palette, color: "text-pink-400" },
  { label: "SQL", icon: Database, color: "text-teal-400" },
  { label: "TypeScript", icon: FileCode2, color: "text-blue-500" },
  { label: "GraphQL", icon: Workflow, color: "text-pink-600" },
  { label: "Machine Learning", icon: Binary, color: "text-purple-400" },
  { label: "Cyber Security", icon: Shield, color: "text-red-400" },
  { label: "System Design", icon: GitBranch, color: "text-orange-400" },
  { label: "AWS", icon: Cloud, color: "text-amber-400" },
  { label: "Data Science", icon: BarChart3, color: "text-cyan-400" },
  { label: "Next.js", icon: Globe, color: "text-slate-100" },
];

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    getLearningPaths()
      .then((response) => setPaths(response.data))
      .catch(() => setPaths([]));
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const completedPaths = paths.filter((path) => path.progress === 100).length;
  const averageProgress = paths.length
    ? Math.round(
      paths.reduce((total, path) => total + path.progress, 0) / paths.length,
    )
    : 0;
  const totalXp = paths.reduce(
    (pathTotal, path) =>
      pathTotal +
      path.roadmap.reduce(
        (stepTotal, step) => stepTotal + (step.quizScore || 0),
        0,
      ),
    0,
  );
  const level = Math.max(1, Math.floor(totalXp / 500) + 1);
  const xpIntoLevel = totalXp % 500;
  const rank =
    totalXp >= 2500
      ? "Master"
      : totalXp >= 1500
        ? "Pro"
        : totalXp >= 700
          ? "Rising"
          : "Starter";

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden text-white">
        <FlowFieldBackground particleCount={420} trailOpacity={0.13} />
        <Navbar />

        <main className="relative z-10 mx-auto flex min-h-screen max-w-[150rem] flex-col justify-center px-6 py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_0_#111827,0_50px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform hover:-translate-y-2">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200">
                <Sparkles size={28} />
              </div>

              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-indigo-200">
                Level {level} {rank}
              </p>

              <h1 className="text-5xl font-bold leading-tight md:text-6xl">
                Welcome {user?.name}
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                Search any course topic, generate a roadmap, save it, and keep
                learning multiple paths from one place.
              </p>

              <form
                onSubmit={handleSearch}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search React, AI, cloud..."
                  className="min-h-14 flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-5 text-white outline-none transition focus:border-indigo-400"
                />

                <button className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]">
                  <Search size={20} />
                  Search
                </button>
              </form>

              <div className="mt-5 flex flex-wrap gap-2">
                {suggestedTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() =>
                      navigate(`/search?q=${encodeURIComponent(topic)}`)
                    }
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-indigo-300 hover:text-white"
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold">More Courses</h2>
                  <Link
                    to="/learning-paths"
                    className="text-sm font-medium text-indigo-200 transition hover:text-white"
                  >
                    View quests
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {moreCourses.map((course) => {
                    const CourseIcon = course.icon;
                    return (
                      <button
                        key={course.label}
                        type="button"
                        onClick={() =>
                          navigate(`/search?q=${encodeURIComponent(course.label)}`)
                        }
                        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/10"
                      >
                        <span className={`mb-2 block ${course.color || 'text-white'}`}>
                          <CourseIcon size={24} />
                        </span>
                        <span className="block font-semibold text-white">
                          {course.label}
                        </span>
                        <span className="mt-1 block text-sm text-slate-400">
                          Generate roadmap
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-indigo-300/20 bg-indigo-400/10 p-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Medal className="text-amber-200" size={24} />
                    <div>
                      <p className="font-semibold text-white">
                        {totalXp} XP earned
                      </p>
                      <p className="text-sm text-slate-400">
                        {500 - xpIntoLevel} XP to level {level + 1}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-indigo-100">
                    Rank: {rank}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-emerald-300"
                    style={{ width: `${(xpIntoLevel / 500) * 100}%` }}
                  />
                </div>
              </div>
            </section>

            <aside className="rounded-[2rem] border border-white/10 bg-white/10 p-6 max-w- shadow-[18px_18px_0_#312e81] backdrop-blur-xl">
              <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6">
                <BookOpen className="mb-5 text-indigo-300" size={36} />

                <h2 className="text-2xl font-bold">Learning Hub</h2>

                <p className="mt-3 text-slate-400">
                  {paths.length
                    ? `${paths.length} saved course path${paths.length > 1 ? "s" : ""}.`
                    : "No learning path saved yet."}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <Target className="mb-2 text-indigo-300" size={22} />
                    <p className="text-2xl font-bold">{paths.length}</p>
                    <p className="text-xs text-slate-400">Courses</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <TrendingUp className="mb-2 text-emerald-300" size={22} />
                    <p className="text-2xl font-bold">{averageProgress}%</p>
                    <p className="text-xs text-slate-400">Avg progress</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <Flame className="mb-2 text-orange-300" size={22} />
                    <p className="text-2xl font-bold">{level}</p>
                    <p className="text-xs text-slate-400">Level</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <Medal className="mb-2 text-amber-300" size={22} />
                    <p className="text-2xl font-bold">{completedPaths}</p>
                    <p className="text-xs text-slate-400">Completed</p>
                  </div>
                </div>

                {paths.length > 0 && (
                  <div className="mt-5 space-y-3">
                    {paths.slice(0, 3).map((path) => (
                      <div
                        key={path._id}
                        className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
                      >
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="font-medium">{path.topic}</span>
                          <span className="text-slate-400">{path.progress}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  <div className="rounded-2xl border border-indigo-300/20 bg-indigo-400/10 p-4">
                    <p className="text-sm font-semibold text-indigo-100">
                      Today's Quest
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Clear one 10-second quiz stage and claim your XP.
                    </p>
                  </div>

                  <Link
                    to="/learning-paths"
                    className="rounded-xl bg-white px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-indigo-100"
                  >
                    Continue Learning
                  </Link>

                  {completedPaths > 0 && (
                    <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                      {completedPaths} path{completedPaths > 1 ? "s" : ""} completed.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

export default Dashboard;
