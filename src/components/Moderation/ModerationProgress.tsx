"use client";

import { useEffect, useState } from "react";
import { getSubmissionStatus } from "@/services/submissionsService";
import { SubmissionStatus } from "@/types/moderation";
import ModerationLoadingState from "./ModerationLoadingState";
import ModerationErrorState from "./ModerationErrorState";
import ModerationProgressBar from "./ModerationProgressBar";
import ModerationResults from "./ModerationResults";
import { ModerationHeader } from "./ModerationHeader";
import ModerationLoadingAnimation from "./ModeratonLoadingAnimation";
import axios from "axios";

interface ModerationProgressProps {
  submissionId: string;
  onComplete: () => void;
}

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
      } catch (err) {
        let message = "Failed to fetch status.";
        if (axios.isAxiosError(err)) {
          message = err.response?.data.message;
        }
        setError(message);
        setLoading(false);
      }
    };
    // didn't have time to implement sockets with socketio :/
    const interval = setInterval(pollStatus, 1000);
    pollStatus();

    return () => clearInterval(interval);
  }, [submissionId]);

  if (error) {
    return <ModerationErrorState error={error} onComplete={onComplete} />;
  }

  if (!status) {
    return <ModerationLoadingState />;
  }

  const currentStage = status.moderation_stage;
  const isCompleted = currentStage === "completed" || currentStage === "error";

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-secondary-color shadow-lg flex flex-col gap-6">
        <ModerationHeader stage={currentStage} />
        <ModerationProgressBar stage={currentStage} isLoading={loading} />
        {isCompleted && status && (
          <ModerationResults status={status} onComplete={onComplete} />
        )}
        {loading && <ModerationLoadingAnimation />}
      </div>
    </div>
  );
}
