interface ModerationReasoningProps {
  reasoning: string;
}

export default function ModerationReasoning({
  reasoning,
}: ModerationReasoningProps) {
  return (
    <div className="p-4 rounded-lg shadow-sm bg-component-background">
      <p className="text-sm font-semibold mb-2">Reasoning</p>
      <p className="text-xs text-gray-700">{reasoning}</p>
    </div>
  );
}
