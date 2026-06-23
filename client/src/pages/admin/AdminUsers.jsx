import { useState, useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import api from "../../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/admin/users");
        setUsers(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-slate-400">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <p className="text-slate-400 mt-2">Manage all registered users on the platform.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="border-b border-white/10 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-white/5 last:border-0 hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-4 font-medium text-white flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                    <UserIcon size={16} />
                  </div>
                  {user.name}
                </td>
                <td className="px-4 py-4">{user.email}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${user.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center py-8 text-slate-500">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
