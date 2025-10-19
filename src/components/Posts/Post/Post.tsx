import UploadedStatus from "./Tags/UploadedStatus";
import ToxicityTag from "./Tags/ToxicityTag";
import WarningTag from "./Tags/WarningTag";

export type PostProps = {
  content: string;
  image?: string;
  uploaded: "approved" | "flagged" | "rejected";
  toxicity: number;
  nsfw_content: boolean;
  violence: boolean;
  timestamp: string;
};

export default function Post({
  content,
  image,
  uploaded,
  toxicity,
  nsfw_content,
  violence,
  timestamp,
}: PostProps) {
  return (
    <div className="max-w-[600px] w-full bg-secondary-color border border-secondary-color-hovered rounded-2xl shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              anonymus
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

      <div className="flex flex-wrap gap-2 mt-2">
        <UploadedStatus status={uploaded} />
        <ToxicityTag percentage={toxicity} />
        {nsfw_content && <WarningTag label="NSFW content" />}
        {violence && <WarningTag label="Violence" />}
      </div>
    </div>
  );
}
