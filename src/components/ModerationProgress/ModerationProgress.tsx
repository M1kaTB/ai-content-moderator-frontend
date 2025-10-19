"use client";

import { useEffect, useState } from "react";
import { getSubmissionStatus } from "@/services/submissionsService";
import { toast } from "react-toastify";
import ImageReplacedTag from "../Posts/Post/Tags/ImageReplacedTag";
import ModerationStageTag from "../Posts/Post/Tags/ModerationStageTag";

export type ModerationStage =
  | "queued"
  | "analyzing"
  | "running_moderation"
  | "evaluating_image"
  | "generating_image"
  | "reanalyzing_image"
  | "finalizing"
  | "completed"
  | "error";

export interface SubmissionStatus {
  id: string;
  status: "pending" | "approved" | "flagged" | "rejected";
  moderation_stage: ModerationStage;
  summary?: string;
  reasoning?: string;
  toxicity?: number;
  nsfw_content?: boolean;
  violence?: boolean;
  image_replaced_by_ai?: boolean;
  imageUrl?: string;
}

interface ModerationProgressProps {
  submissionId: string;
  onComplete: () => void;
}

const stageDescriptions: Record<ModerationStage, string> = {
  queued: "Waiting in queue...",
  analyzing: "Analyzing content...",
  running_moderation: "Running moderation checks...",
  evaluating_image: "Evaluating image...",
  generating_image: "Generating replacement image...",
  reanalyzing_image: "Re-analyzing new image...",
  finalizing: "Finalizing results...",
  completed: "Moderation complete!",
  error: "Error during moderation",
};

export default function ModerationProgress({
  submissionId,
  onComplete,
}: ModerationProgressProps) {
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const data = await getSubmissionStatus(submissionId);
        setStatus(data);

        if (
          data.moderation_stage === "completed" ||
          data.moderation_stage === "error"
        ) {
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Failed to fetch status:", err);
        setError(err.response?.data?.message || "Failed to fetch status");
        setLoading(false);
      }
    };

    const interval = setInterval(pollStatus, 1000);
    pollStatus();

    return () => clearInterval(interval);
  }, [submissionId]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-5">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-component-background shadow-lg flex flex-col items-center gap-5">
          <div className="text-5xl">❌</div>
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-center text-gray-600">{error}</p>
          <button
            onClick={onComplete}
            className="w-full bg-primary-color p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-primary-color-hovered font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-screen p-5">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-component-background shadow-lg flex flex-col items-center gap-5">
          <div className="animate-spin text-5xl">⏳</div>
          <p className="text-gray-600">Loading moderation status...</p>
        </div>
      </div>
    );
  }

  const currentStage = status.moderation_stage;
  const isCompleted = currentStage === "completed" || currentStage === "error";

  const getStatusColor = () => {
    if (status.status === "approved") return "text-green-600";
    if (status.status === "rejected") return "text-red-600";
    if (status.status === "flagged") return "text-yellow-600";
    return "text-blue-600";
  };

  const getStatusBgColor = () => {
    if (status.status === "approved") return "bg-green-700";
    if (status.status === "rejected") return "bg-red-700";
    if (status.status === "flagged") return "bg-yellow-700";
    return "bg-blue-50";
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div
        className={`max-w-md w-full mx-auto p-8 rounded-2xl bg-secondary-color shadow-lg flex flex-col gap-6 `}
      >
        <div className="flex flex-col items-center gap-2">
          <img src="/logo.png" alt="main logo" className="max-w-20" />
          <h1 className="text-2xl font-bold">Content Moderation</h1>
          <ModerationStageTag stage={currentStage} />
        </div>
        <div className="text-center text-gray-700">
          <p className="text-lg font-medium">
            {stageDescriptions[currentStage]}
          </p>
        </div>
        <div className="w-full mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
              style={{
                width: `${
                  loading
                    ? (Object.keys(stageDescriptions).indexOf(currentStage) /
                        Object.keys(stageDescriptions).length) *
                      100
                    : 100
                }%`,
              }}
            ></div>
          </div>
        </div>
        {isCompleted && status && (
          <div className="space-y-4 mt-4">
            <div
              className={`text-center p-4 rounded-lg shadow-md ${getStatusBgColor()}`}
            >
              <p className={`text-xl font-bold `}>
                {status.status.toUpperCase()}
              </p>
            </div>

            {status.image_replaced_by_ai && <ImageReplacedTag />}

            {status.summary && (
              <div className="p-4 rounded-lg shadow-sm bg-component-background">
                <p className="text-sm font-semibold mb-2">Summary</p>
                <p className="text-sm text-gray-700">{status.summary}</p>
              </div>
            )}

            <div className="p-4 rounded-lg shadow-sm bg-component-background space-y-2">
              <p className="text-sm font-semibold mb-3">Analysis</p>
              {status.toxicity !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Toxicity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          status.toxicity < 0.3
                            ? "bg-green-500"
                            : status.toxicity < 0.7
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${(status.toxicity * 100).toFixed(0)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {(status.toxicity * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
              {status.nsfw_content !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">NSFW Content</span>
                  <span
                    className={`text-sm font-semibold ${
                      status.nsfw_content ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {status.nsfw_content ? "Detected" : "Clear"}
                  </span>
                </div>
              )}
              {status.violence !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Violence</span>
                  <span
                    className={`text-sm font-semibold ${
                      status.violence ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {status.violence ? "Detected" : "Clear"}
                  </span>
                </div>
              )}
            </div>

            {status.reasoning && (
              <div className="p-4 rounded-lg shadow-sm bg-component-background">
                <p className="text-sm font-semibold mb-2">Reasoning</p>
                <p className="text-xs text-gray-700">{status.reasoning}</p>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={onComplete}
                className="flex-1 bg-primary-color p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-primary-color-hovered font-semibold"
              >
                Back to Home
              </button>
              {status.imageUrl && status.image_replaced_by_ai && (
                <button
                  onClick={() => window.open(status.imageUrl, "_blank")}
                  className="flex-1 bg-secondary-color p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-secondary-color-hovered font-semibold"
                >
                  View New Image
                </button>
              )}
            </div>
          </div>
        )}
        {loading && (
          <div className="flex justify-center gap-2 mt-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-seq"></span>
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce-seq animation-delay-200"></span>
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce-seq animation-delay-400"></span>
          </div>
        )}
      </div>
    </div>
  );
}
