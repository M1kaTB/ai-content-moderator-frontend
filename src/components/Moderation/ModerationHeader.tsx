import ModerationStageTag from "../Posts/Post/Tags/ModerationStageTag";
import { ModerationStage, stageDescriptions } from "@/types/moderation";

interface ModerationHeaderProps {
  stage: ModerationStage;
}

export function ModerationHeader({ stage }: ModerationHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src="/logo.png" alt="main logo" className="max-w-20" />
      <h1 className="text-2xl font-bold">Content Moderation</h1>
      <ModerationStageTag stage={stage} />
      <div className="text-center text-gray-700">
        <p className="text-lg font-medium">{stageDescriptions[stage]}</p>
      </div>
    </div>
  );
}
