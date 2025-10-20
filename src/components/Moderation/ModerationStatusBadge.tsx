interface ModerationStatusBadgeProps {
  status: "pending" | "approved" | "flagged" | "rejected";
}

export default function ModerationStatusBadge({
  status,
}: ModerationStatusBadgeProps) {
  const getBgColor = () => {
    if (status === "approved") return "bg-green-700";
    if (status === "rejected") return "bg-red-700";
    if (status === "flagged") return "bg-yellow-700";
    return "bg-blue-50";
  };

  return (
    <div className={`text-center p-4 rounded-lg shadow-md ${getBgColor()}`}>
      <p className="text-xl font-bold">{status.toUpperCase()}</p>
    </div>
  );
}
