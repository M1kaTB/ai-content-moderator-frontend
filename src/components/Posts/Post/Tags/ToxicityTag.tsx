type ToxicityTagProps = {
  percentage: number;
};

export default function ToxicityTag({ percentage }: ToxicityTagProps) {
  let color = "bg-blue-100 text-blue-800";
  if (percentage >= 50) color = "bg-red-100 text-red-800";
  else if (percentage >= 20) color = "bg-yellow-100 text-yellow-800";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      Toxicity: {percentage}%
    </span>
  );
}
