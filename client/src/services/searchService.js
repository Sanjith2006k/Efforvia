import api from "./api";

export const searchTopic = async (query) => {
  const response = await api.get(`/search?q=${query}`);

  return response.data;
};
