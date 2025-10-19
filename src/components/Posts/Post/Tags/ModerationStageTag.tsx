type ModerationStageTagProps = {
  stage: string;
};

export default function ModerationStageTag({ stage }: ModerationStageTagProps) {
  const stageEmojis: Record<string, string> = {
    queued: "📋",
    analyzing: "🔍",
    running_moderation: "⚙️",
    evaluating_image: "🖼️",
    generating_image: "✨",
    reanalyzing_image: "🔄",
    finalizing: "✅",
    completed: "🎉",
    error: "❌",
  };

  const stageName = stage.replace(/_/g, " ");
  const emoji = stageEmojis[stage] || "⏳";

  return (
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 animate-pulse">
      {emoji} {stageName.charAt(0).toUpperCase() + stageName.slice(1)}
    </span>
  );
}
