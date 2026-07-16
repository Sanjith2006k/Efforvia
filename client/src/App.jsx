import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./services/api";
import ServerWakeup from "./components/ui/ServerWakeup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchResults from "./pages/SearchResults";
import LearningPaths from "./components/LearningPaths";
import AdminRoute from "./pages/admin/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFeedbacks from "./pages/admin/AdminFeedbacks";
import AdminLearningPaths from "./pages/admin/AdminLearningPaths";

function App() {
  const [serverStatus, setServerStatus] = useState(
    sessionStorage.getItem("serverReady") ? "ready" : "checking"
  );
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (serverStatus === "ready") return;

    const timer = setTimeout(() => setShowLoading(true), 1500);

    const checkServer = async () => {
      try {
        await api.get("/");
        clearTimeout(timer);
        sessionStorage.setItem("serverReady", "true");
        setServerStatus("ready");
      } catch (error) {
        setTimeout(checkServer, 3000);
      }
    };

    checkServer();

    return () => clearTimeout(timer);
  }, [serverStatus]);

  if (serverStatus === "checking") {
    if (showLoading) return <ServerWakeup />;
    return <div className="min-h-screen bg-slate-950"></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-paths"
          element={
            <ProtectedRoute>
              <LearningPaths />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="feedback" element={<AdminFeedbacks />} />
            <Route path="learning-paths" element={<AdminLearningPaths />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;