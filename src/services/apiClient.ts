"use client";

import axios, { AxiosInstance } from "axios";
import { createClient } from "@/utils/supabase/client";
import { createBrowserClient } from "@supabase/ssr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let supabase = createClient?.();
if (!supabase) {
  supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.warn("[apiClient] No active Supabase session found.");
      return config;
    }

    config.headers.Authorization = `Bearer ${session.access_token}`;
  } catch (error) {
    console.error("[apiClient] Error retrieving session:", error);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const msg = error.response?.data?.message || error.message;
    console.error(`[apiClient] ${status || "Error"}: ${msg}`);
    return Promise.reject(error);
  }
);

export default api;
