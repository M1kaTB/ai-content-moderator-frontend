import ImageReplacedTag from "../Posts/Post/Tags/ImageReplacedTag";
import { SubmissionStatus } from "@/types/moderation";
import ModerationStatusBadge from "./ModerationStatusBadge";
import ModerationAnalysis from "./ModerationAnalysis";
import ModerationActions from "./ModerationActions";
import ModerationSummary from "./ModerationSummary";
import ModerationReasoning from "./ModerationReasoning";

interface ModerationResultsProps {
  status: SubmissionStatus;
  onComplete: () => void;
}

export default function ModerationResults({
  status,
  onComplete,
}: ModerationResultsProps) {
  return (
    <div className="space-y-4 mt-4">
      <ModerationStatusBadge status={status.status} />
      {status.image_replaced_by_ai && <ImageReplacedTag />}
      {status.summary && <ModerationSummary summary={status.summary} />}
      <ModerationAnalysis status={status} />
      {status.reasoning && <ModerationReasoning reasoning={status.reasoning} />}
      <ModerationActions status={status} onComplete={onComplete} />
    </div>
  );
}
