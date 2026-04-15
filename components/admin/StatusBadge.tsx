const styles: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  replied: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-200 text-slate-700",
  spam: "bg-rose-100 text-rose-800",
};

export default function StatusBadge({
  status,
  label,
}: {
  status: string;
  label?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {label ?? status.replace("_", " ")}
    </span>
  );
}
