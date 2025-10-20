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

export const stageDescriptions: Record<ModerationStage, string> = {
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
