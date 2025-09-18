type Props = { value: number; label?: string; colorClass?: string };
export function ProgressBar({ value, label, colorClass }: Props) {
  const cl = colorClass ?? "bg-primary";
  return (
    <div>
      {label && <div className="mb-1 text-sm text-muted-foreground">{label}</div>}
      <div className="h-3 w-full rounded-full bg-muted">
        <div
          className={`h-3 rounded-full ${cl}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
