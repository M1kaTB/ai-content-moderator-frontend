import { SubmissionStatus } from "@/types/moderation";

interface ModerationAnalysisProps {
  status: SubmissionStatus;
}

export default function ModerationAnalysis({
  status,
}: ModerationAnalysisProps) {
  return (
    <div className="p-4 rounded-lg shadow-sm bg-component-background space-y-2">
      <p className="text-sm font-semibold mb-3">Analysis</p>
      {status.toxicity !== undefined && (
        <ToxicityMetric toxicity={status.toxicity} />
      )}
      {status.nsfw_content !== undefined && (
        <NsfwMetric detected={status.nsfw_content} />
      )}
      {status.violence !== undefined && (
        <ViolenceMetric detected={status.violence} />
      )}
    </div>
  );
}
function ToxicityMetric({ toxicity }: { toxicity: number }) {
  const color =
    toxicity < 0.3
      ? "bg-green-500"
      : toxicity < 0.7
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm">Toxicity</span>
      <div className="flex items-center gap-2">
        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${color}`}
            style={{
              width: `${(toxicity * 100).toFixed(0)}%`,
            }}
          ></div>
        </div>
        <span className="text-sm font-semibold w-12 text-right">
          {(toxicity * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

function NsfwMetric({ detected }: { detected: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm">NSFW Content</span>
      <span
        className={`text-sm font-semibold ${
          detected ? "text-red-600" : "text-green-600"
        }`}
      >
        {detected ? "Detected" : "Clear"}
      </span>
    </div>
  );
}

function ViolenceMetric({ detected }: { detected: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm">Violence</span>
      <span
        className={`text-sm font-semibold ${
          detected ? "text-red-600" : "text-green-600"
        }`}
      >
        {detected ? "Detected" : "Clear"}
      </span>
    </div>
  );
}
