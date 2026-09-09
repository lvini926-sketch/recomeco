interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  size?: "sm" | "md";
}

export default function ProgressBar({
  value,
  label,
  size = "md",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="font-medium text-carvao-900">{label}</span>
          <span className="text-carvao-600">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progresso"}
        className={`w-full overflow-hidden rounded-full bg-petroleo-100 ${height}`}
      >
        <div
          className="h-full rounded-full bg-salvia-600 transition-[width] duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
