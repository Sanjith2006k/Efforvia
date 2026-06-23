import { useState } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import api from "../services/api";

function FeedbackModal({ isOpen, onClose }) {
  const [type, setType] = useState("feature");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      await api.post("/feedback", { type, message });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-950 p-6">
          <div className="flex items-center gap-3 text-indigo-300">
            <MessageSquare size={24} />
            <h2 className="text-xl font-bold text-white">Send Feedback</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-emerald-400">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <Send size={32} />
              </div>
              <h3 className="text-xl font-semibold">Thank you!</h3>
              <p className="mt-2 text-sm text-slate-400">
                Your feedback has been sent to the admins.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["feature", "bug", "general"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`rounded-xl border py-2 text-sm font-medium capitalize transition-all ${
                        type === t
                          ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                          : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you think or report a bug..."
                  className="min-h-[120px] resize-none rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:bg-slate-800"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_0_#312e81]"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Send Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;
