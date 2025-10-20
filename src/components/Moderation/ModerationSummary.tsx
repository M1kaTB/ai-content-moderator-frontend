interface ModerationSummaryProps {
  summary: string;
}

export default function ModerationSummary({ summary }: ModerationSummaryProps) {
  return (
    <div className="p-4 rounded-lg shadow-sm bg-component-background">
      <p className="text-sm font-semibold mb-2">Summary</p>
      <p className="text-sm text-gray-700">{summary}</p>
    </div>
  );
}
