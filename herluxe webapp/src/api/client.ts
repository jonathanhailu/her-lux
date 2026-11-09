import axios from "axios";
import { API_BASE_URL } from "@/constants";

// Centralised Axios instance — backend devs can plug in DRF endpoints later.
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

let authToken: string | null = null;
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Token ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    // Centralised error handling hook — extend with toast / logout.
    if (typeof window !== "undefined" && err?.response?.status === 401) {
      // window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(err);
  },
);