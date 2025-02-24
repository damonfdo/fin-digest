import { News } from "../types/news";
import apiClient from "./apiClient";

export const fetchNewsAPI = async (): Promise<News[]> => {
  const endpoint = `/news?category=general&token=${process.env.EXPO_API_TOKEN}`;
  try {
    const response = await apiClient(endpoint);
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch news");
  }
};
