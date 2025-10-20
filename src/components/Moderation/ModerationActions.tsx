import { SubmissionStatus } from "@/types/moderation";

interface ModerationActionsProps {
  status: SubmissionStatus;
  onComplete: () => void;
}

export default function ModerationActions({
  status,
  onComplete,
}: ModerationActionsProps) {
  return (
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
  );
}
