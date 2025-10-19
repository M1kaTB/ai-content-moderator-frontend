type UploadedStatusProps = {
  status: "pending" | "approved" | "flagged" | "rejected";
};

export default function UploadedStatus({ status }: UploadedStatusProps) {
  const colors = {
    pending: "bg-blue-100 text-blue-800 animate-pulse",
    approved: "bg-green-100 text-green-800",
    flagged: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  const statusText = {
    pending: "⏳ Pending",
    approved: "✅ Approved",
    flagged: "⚠️ Flagged",
    rejected: "❌ Rejected",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {statusText[status]}
    </span>
  );
}
