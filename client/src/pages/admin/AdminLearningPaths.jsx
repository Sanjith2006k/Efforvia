import { useState, useEffect } from "react";
import { FileText, Trash2, Edit3, XCircle, Plus } from "lucide-react";
import api from "../../services/api";

function AdminLearningPaths() {
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingPath, setEditingPath] = useState(null);

  const [formTopic, setFormTopic] = useState("");
  const [formRoadmap, setFormRoadmap] = useState([]);
  const [newStep, setNewStep] = useState("");

  const fetchLearningPaths = async () => {
    try {
      const { data } = await api.get("/admin/learning-paths");
      setLearningPaths(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch learning paths");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningPaths();
  }, []);

  const resetForm = () => {
    setFormTopic("");
    setFormRoadmap([]);
    setNewStep("");
    setEditingPath(null);
  };

  const handleAddStep = () => {
    if (!newStep.trim()) return;

    setFormRoadmap((prev) => [...prev, { title: newStep.trim() }]);

    setNewStep("");
  };

  const handleRemoveStep = (index) => {
    setFormRoadmap((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateStep = (index, value) => {
    const updated = [...formRoadmap];

    updated[index] = {
      ...updated[index],
      title: value,
    };

    setFormRoadmap(updated);
  };

  const handleCreateLearningPath = async () => {
    try {
      await api.post("/admin/learning-paths", {
        topic: formTopic,
        roadmap: formRoadmap,
      });

      resetForm();
      setShowCreateModal(false);

      fetchLearningPaths();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create learning path");
    }
  };

  const handleUpdateLearningPath = async () => {
    try {
      await api.put(`/admin/learning-paths/${editingPath._id}`, {
        topic: formTopic,
        roadmap: formRoadmap,
      });

      resetForm();
      setShowEditModal(false);

      fetchLearningPaths();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update learning path");
    }
  };

  const handleDeleteLearningPath = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this learning path?")
    ) {
      return;
    }

    try {
      await api.delete(`/admin/learning-paths/${id}`);

      setLearningPaths((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete learning path");
    }
  };

  const handleEditLearningPath = (path) => {
    setEditingPath(path);
    setFormTopic(path.topic);
    setFormRoadmap(path.roadmap || []);
    setShowEditModal(true);
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    resetForm();
  };

  const ModalContent = ({ isEdit = false }) => (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-300">
          Topic
        </label>

        <input
          type="text"
          value={formTopic}
          onChange={(e) => setFormTopic(e.target.value)}
          placeholder="React, JavaScript, Python..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-300">
          Roadmap Steps
        </label>

        <div className="space-y-2">
          {formRoadmap.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={step.title}
                onChange={(e) => handleUpdateStep(index, e.target.value)}
                className="flex-1 rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-300 focus:border-indigo-400 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => handleRemoveStep(index)}
                className="rounded bg-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/30"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <div className="flex gap-2">
            <input
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddStep();
                }
              }}
              placeholder="Add roadmap step"
              className="flex-1 rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-300 focus:border-indigo-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleAddStep}
              className="rounded bg-indigo-600 px-4 text-white hover:bg-indigo-500"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={closeModals}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-300"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={isEdit ? handleUpdateLearningPath : handleCreateLearningPath}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          {isEdit ? "Update Learning Path" : "Create Learning Path"}
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-slate-400">Loading learning paths...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Learning Paths</h1>

        <p className="mt-2 text-slate-400">
          Manage learning paths and roadmaps.
        </p>

        <button
          onClick={openCreateModal}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
        >
          <Plus size={18} />
          Create New Learning Path
        </button>
      </div>

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-2xl font-bold text-white">
                {showEditModal ? "Edit Learning Path" : "Create Learning Path"}
              </h2>

              <button onClick={closeModals}>
                <XCircle size={22} className="text-slate-300" />
              </button>
            </div>

            <ModalContent isEdit={showEditModal} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="border-b border-white/10 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-4 py-3">Topic</th>
              <th className="px-4 py-3">Steps</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {learningPaths.length > 0 ? (
              learningPaths.map((path) => (
                <tr
                  key={path._id}
                  className="border-b border-white/5 hover:bg-slate-800/50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                        <FileText size={16} />
                      </div>

                      <span className="font-medium text-white">
                        {path.topic}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="text-indigo-300">
                      {path.roadmap?.length || 0} steps
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {path.createdAt
                      ? new Date(path.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditLearningPath(path)}
                        className="rounded bg-indigo-500/20 px-3 py-2 text-indigo-300 hover:bg-indigo-500/30"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteLearningPath(path._id)}
                        className="rounded bg-rose-500/20 px-3 py-2 text-rose-300 hover:bg-rose-500/30"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500">
                  No learning paths found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLearningPaths;
