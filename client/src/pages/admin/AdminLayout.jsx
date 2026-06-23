import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, LogOut, ArrowLeft } from "lucide-react";
import { AuthContext } from "../../context/AuthContextValue";
import FlowFieldBackground from "../../components/ui/FlowFieldBackground";

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Feedback", path: "/admin/feedback", icon: MessageSquare },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex">
      <FlowFieldBackground />

      <aside className="relative z-10 w-64 border-r border-white/10 bg-slate-950/80 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1">Logged in as {user?.email}</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-[0_4px_0_#312e81]"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 transition-all hover:bg-slate-900 hover:text-slate-200"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">User View</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300 w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="relative z-10 flex-1 h-screen overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
