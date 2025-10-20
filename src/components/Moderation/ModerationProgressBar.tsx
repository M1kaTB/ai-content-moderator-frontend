import { ModerationStage, stageDescriptions } from "@/types/moderation";

interface ModerationProgressBarProps {
  stage: ModerationStage;
  isLoading: boolean;
}

export default function ModerationProgressBar({
  stage,
  isLoading,
}: ModerationProgressBarProps) {
  const progress =
    (Object.keys(stageDescriptions).indexOf(stage) /
      Object.keys(stageDescriptions).length) *
    100;

  return (
    <div className="w-full mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
          style={{
            width: `${isLoading ? progress : 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
