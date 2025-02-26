import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_BASE}`,
  responseType: "json",
});

export default apiClient;
