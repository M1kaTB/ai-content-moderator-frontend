export default function ModerationLoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-component-background shadow-lg flex flex-col items-center gap-5">
        <div className="animate-spin text-5xl">⏳</div>
        <p className="text-gray-600">Loading moderation status...</p>
      </div>
    </div>
  );
}
