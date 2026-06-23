import api from "./api";

export const saveLearningPath = (topic, roadmap) =>
  api.post("/learning/save", {
    topic,
    roadmap,
  });

export const getLearningPaths = () => api.get("/learning");

export const toggleStep = (pathId, stepIndex, quizScore = 0) =>
  api.put("/learning/toggle", {
    pathId,
    stepIndex,
    quizScore,
  });

export const deleteLearningPath = (pathId) => api.delete(`/learning/${pathId}`);
