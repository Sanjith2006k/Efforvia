import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Flame,
  Medal,
  PlayCircle,
  Search,
  Trophy,
  Trash2,
} from "lucide-react";

import { getLearningPaths, toggleStep, deleteLearningPath } from "../services/learningService";
import Navbar from "./Navbar";
import FlowFieldBackground from "./ui/FlowFieldBackground";
import QuizModal from "./QuizModal";
import Footer from "./Footer";

function LearningPaths() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);

  const loadPaths = async () => {
    const response = await getLearningPaths();

    setPaths(response.data);
  };

  useEffect(() => {
    let active = true;

    getLearningPaths()
      .then((response) => {
        if (active) {
          setPaths(response.data);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleDeletePath = async (pathId, topic) => {
    if (window.confirm(`Are you sure you want to remove the "${topic}" learning path?`)) {
      try {
        await deleteLearningPath(pathId);
        loadPaths();
      } catch (error) {
        alert(error.response?.data?.message || "Could not remove learning path.");
      }
    }
  };

  const openQuiz = (pathId, stepIndex, stepTitle, completed) => {
    if (completed) return;

    if (window.confirm("Are you sure you want to attend this quiz?")) {
      setActiveQuiz({ pathId, stepIndex, stepTitle });
    }
  };

  const handleQuizComplete = async (quizScore) => {
    if (!activeQuiz) return;

    await toggleStep(activeQuiz.pathId, activeQuiz.stepIndex, quizScore);

    setActiveQuiz(null);
    loadPaths();
  };

  const getBadge = (progress) => {
    if (progress === 100) return "Legend";
    if (progress >= 75) return "Boss Stage";
    if (progress >= 40) return "Combo Run";
    if (progress > 0) return "First Wins";
    return "New Quest";
  };

  return (
    <div className="relative min-h-screen px-6 py-24 text-white">
      <FlowFieldBackground particleCount={320} trailOpacity={0.14} />
      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-indigo-200">
              Your Roadmaps
            </p>
            <h1 className="text-5xl font-bold">Continue Learning</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Every saved course now includes a roadmap, related videos, and
              hand-picked notes for each step.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
                Quiz score becomes XP
              </span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
                Badges unlock with progress
              </span>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]"
          >
            <Search size={18} />
            Add Another Course
          </Link>
        </div>

        {loading && (
          <p className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-slate-300">
            Loading your learning paths...
          </p>
        )}

        {!loading && paths.length === 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
            <BookOpen className="mb-4 text-indigo-300" size={34} />
            <h2 className="text-2xl font-bold text-white">No paths yet</h2>
            <p className="mt-2">
              Search a course from your dashboard and save the roadmap to start.
            </p>
          </div>
        )}

        <div className="grid gap-10">
          {paths.map((path) => (
            <section
              key={path._id}
              className="rounded-3xl border border-slate-800 bg-slate-900/65 p-6 shadow-[14px_14px_0_#1e1b4b] backdrop-blur-xl"
            >
              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-bold">{path.topic}</h2>
                    <span className="flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm text-amber-100">
                      <Trophy size={16} />
                      {getBadge(path.progress)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-300">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                      {path.roadmap.length} steps
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                      {path.roadmap.reduce(
                        (total, step) => total + (step.quizScore || 0),
                        0,
                      )}{" "}
                      XP
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-56">
                  <div className="w-full">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleDeletePath(path._id, path.topic)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 hover:text-white"
                  >
                    <Trash2 size={13} />
                    Remove Course
                  </button>
                </div>
              </div>

              <div className="grid gap-5">
                {path.roadmap.map((step, index) => (
                  <article
                    key={step._id || index}
                    className={`rounded-2xl border p-5 transition ${
                      step.completed
                        ? "border-emerald-300/30 bg-emerald-400/10"
                        : "border-slate-800 bg-slate-950/60"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <label className="flex cursor-pointer items-start gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            openQuiz(path._id, index, step.title, step.completed)
                          }
                          className={`mt-1 flex h-6 w-6 items-center justify-center rounded-md border ${
                            step.completed
                              ? "border-emerald-300 bg-emerald-400/20"
                              : "border-slate-600 bg-slate-900 hover:border-indigo-300"
                          }`}
                          aria-label={
                            step.completed
                              ? `${step.title} completed`
                              : `Start quiz for ${step.title}`
                          }
                        >
                          {step.completed && (
                            <CheckCircle2 size={16} className="text-emerald-200" />
                          )}
                        </button>
                        <span>
                          <span className="flex items-center gap-2 text-lg font-semibold">
                            {step.completed && (
                              <CheckCircle2 size={18} className="text-emerald-300" />
                            )}
                            {!step.completed && (
                              <Flame size={18} className="text-orange-300" />
                            )}
                            {step.title}
                          </span>
                          <span className="mt-1 block text-sm text-slate-400">
                            {step.completed
                              ? `Cleared. Quiz reward: ${step.quizScore || 0} XP.`
                              : "Complete this quest with focused notes and videos."}
                          </span>
                        </span>
                      </label>

                      <div className="flex flex-wrap gap-2">
                        <span className="w-fit rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 text-sm text-indigo-100">
                          Stage {index + 1}
                        </span>
                        {!step.completed && (
                          <button
                            type="button"
                            onClick={() =>
                              openQuiz(path._id, index, step.title, step.completed)
                            }
                            className="w-fit rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm text-amber-100 transition hover:bg-amber-300/20"
                          >
                            Start Quiz
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      <div>
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-indigo-200">
                          <FileText size={18} />
                          Quest Notes
                        </h3>
                        <div className="grid gap-3">
                          {step.notes?.map((note) => (
                            <a
                              key={note.url}
                              href={note.url}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-indigo-400"
                            >
                              <span className="font-medium">{note.title}</span>
                              <span className="mt-1 block text-sm text-slate-400">
                                {note.description}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-indigo-200">
                          <PlayCircle size={18} />
                          Training Videos
                        </h3>
                        <div className="grid gap-3">
                          {step.videos?.map((video) => (
                            <a
                              key={video.videoId || video.url}
                              href={video.url}
                              target="_blank"
                              rel="noreferrer"
                              className="grid grid-cols-[96px_1fr] gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3 transition hover:border-indigo-400"
                            >
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="h-16 w-24 rounded-lg object-cover"
                              />
                              <span>
                                <span className="line-clamp-2 text-sm font-medium">
                                  {video.title}
                                </span>
                                <span className="mt-1 block text-xs text-slate-400">
                                  {video.channel}
                                </span>
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {path.progress === 100 && (
                <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5 text-amber-100">
                  <div className="flex items-center gap-3">
                    <Medal size={24} />
                    <p className="font-semibold">
                      Path completed. Badge unlocked: {getBadge(path.progress)}
                    </p>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {activeQuiz && (
        <QuizModal
          stepTitle={activeQuiz.stepTitle}
          onClose={() => setActiveQuiz(null)}
          onComplete={handleQuizComplete}
        />
      )}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default LearningPaths;
