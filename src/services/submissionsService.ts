"use client";
import axios from "axios";
import api from "./apiClient";

export const getSubmissions = async () => {
  try {
    const response = await api.get("/submissions");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "[getSubmissions] Failed:",
        error.response?.data || error.message
      );
    } else {
      console.error("[getSubmissions] Failed:", error);
    }
    throw error;
  }
};

export const getPersonalSubmissions = async () => {
  try {
    const response = await api.get("/submissions/user/my-submissions");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "[getPersonalSubmissions] Failed:",
        error.response?.data || error.message
      );
    } else {
      console.error("[getPersonalSubmissions] Failed:", error);
    }
    throw error;
  }
};

export const uploadSubmission = async ({
  type,
  content,
  image,
}: {
  type: "text" | "image";
  content: string;
  image?: File | null;
}) => {
  try {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    const response = await api.post("/submissions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "[uploadSubmission] Failed:",
        error.response?.data || error.message
      );
    } else {
      console.error("[uploadSubmission] Failed:", error);
    }
    throw error;
  }
};

export const getSubmissionStatus = async (submissionId: string) => {
  try {
    const response = await api.get(`/submissions/${submissionId}/status`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "[getSubmissionStatus] Failed:",
        error.response?.data || error.message
      );
    } else {
      console.error("[getSubmissionStatus] Failed:", error);
    }
    throw error;
  }
};
