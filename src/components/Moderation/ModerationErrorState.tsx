interface ModerationErrorStateProps {
  error: string;
  onComplete: () => void;
}

export default function ModerationErrorState({
  error,
  onComplete,
}: ModerationErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-component-background shadow-lg flex flex-col items-center gap-5">
        <div className="text-5xl">❌</div>
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-center text-gray-600">{error}</p>
        <button
          onClick={onComplete}
          className="w-full bg-primary-color p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-primary-color-hovered font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
