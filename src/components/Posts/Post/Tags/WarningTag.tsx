type WarningTagProps = {
  label: string;
};

export default function WarningTag({ label }: WarningTagProps) {
  return (
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
      {label}
    </span>
  );
}
