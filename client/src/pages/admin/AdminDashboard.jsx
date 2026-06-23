import { useState, useEffect } from "react";
import { Users, MessageSquare, Clock } from "lucide-react";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, totalFeedback: 0, pendingFeedback: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-slate-400">Loading dashboard...</div>;
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
    },
    {
      title: "Total Feedback",
      value: stats.totalFeedback,
      icon: MessageSquare,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      border: "border-purple-500/30",
    },
    {
      title: "Pending Feedback",
      value: stats.pendingFeedback,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      border: "border-amber-500/30",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <p className="text-slate-400 mt-2">Welcome to the Efforvia admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`rounded-2xl border ${stat.border} bg-slate-900/60 p-6 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="mt-2 text-4xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
