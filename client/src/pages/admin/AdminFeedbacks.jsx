import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle, Clock } from "lucide-react";
import api from "../../services/api";

function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const { data } = await api.get("/admin/feedbacks");
      setFeedbacks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/admin/feedbacks/${id}`, { status: newStatus });
      setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, status: newStatus } : f));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "bug": return "text-red-400 bg-red-500/10 border-red-500/20";
      case "feature": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      default: return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved": return <CheckCircle size={16} className="text-emerald-400" />;
      case "reviewed": return <CheckCircle size={16} className="text-blue-400" />;
      default: return <Clock size={16} className="text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">User Feedback</h1>
        <p className="text-slate-400 mt-2">Read and manage suggestions and bug reports.</p>
      </div>

      <div className="grid gap-4">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 flex-shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{feedback.user?.name || "Unknown User"}</span>
                    <span className="text-xs text-slate-500">{feedback.user?.email || "No Email"}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border capitalize ${getTypeColor(feedback.type)}`}>
                      {feedback.type}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-white/5">
                    {feedback.message}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/50 border border-white/5 mb-2">
                  {getStatusIcon(feedback.status)}
                  <span className="text-xs font-medium text-slate-300 capitalize">{feedback.status}</span>
                </div>
                <select
                  value={feedback.status}
                  onChange={(e) => handleStatusUpdate(feedback._id, e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-2 outline-none text-white focus:border-indigo-500 transition-colors"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div className="text-center py-12 rounded-2xl border border-white/10 bg-slate-900/60">
            <MessageSquare size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">No feedback found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFeedbacks;
