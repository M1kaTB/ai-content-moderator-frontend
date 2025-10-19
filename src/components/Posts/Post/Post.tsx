import UploadedStatus from "./Tags/UploadedStatus";
import ToxicityTag from "./Tags/ToxicityTag";
import WarningTag from "./Tags/WarningTag";
import ImageReplacedTag from "./Tags/ImageReplacedTag";
import ModerationStageTag from "./Tags/ModerationStageTag";

export type PostProps = {
  id: string;
  content: string;
  image?: string;
  status: "pending" | "approved" | "flagged" | "rejected";
  moderation_stage?: string;
  toxicity: number;
  nsfw_content: boolean;
  violence: boolean;
  image_replaced_by_ai?: boolean;
  timestamp: string;
  summary?: string;
  reasoning?: string;
};

export default function Post({
  id,
  content,
  image,
  status,
  moderation_stage,
  toxicity,
  nsfw_content,
  violence,
  image_replaced_by_ai,
  timestamp,
  summary,
  reasoning,
}: PostProps) {
  return (
    <div className="max-w-[600px] w-full bg-secondary-color border border-secondary-color-hovered rounded-2xl shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              anonymous
            </p>
            <p className="text-gray-500 text-sm">{timestamp}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-900 dark:text-gray-100">{content}</p>

      {image && (
        <div className="rounded-2xl overflow-hidden">
          <img
            src={image}
            alt="post image"
            className="w-full max-h-[400px] object-cover"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <UploadedStatus status={status} />

        {status === "pending" && moderation_stage && (
          <ModerationStageTag stage={moderation_stage} />
        )}

        {status !== "pending" && (
          <>
            <ToxicityTag percentage={toxicity} />
            {nsfw_content && <WarningTag label="NSFW content" />}
            {violence && <WarningTag label="Violence" />}
            {image_replaced_by_ai && <ImageReplacedTag />}
          </>
        )}
      </div>

      {status !== "pending" && (summary || reasoning) && (
        <details className="mt-4 cursor-pointer">
          <summary className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:hover:text-gray-300">
            View Details →
          </summary>
          <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {summary && (
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Summary
                </p>
                <p>{summary}</p>
              </div>
            )}
            {reasoning && (
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Reasoning
                </p>
                <p>{reasoning}</p>
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
}
