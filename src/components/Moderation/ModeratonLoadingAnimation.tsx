export default function ModerationLoadingAnimation() {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-seq"></span>
      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce-seq animation-delay-200"></span>
      <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce-seq animation-delay-400"></span>
    </div>
  );
}
