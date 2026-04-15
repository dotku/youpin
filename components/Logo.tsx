import Image from "next/image";

export default function Logo({
  variant = "dark",
  withWordmark = true,
}: {
  variant?: "dark" | "light";
  withWordmark?: boolean;
}) {
  const textCls =
    variant === "dark"
      ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
      : "text-ink-900";

  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/images/logomark.svg"
        alt="UPIN logo"
        width={40}
        height={40}
        priority
        className="h-9 w-9"
      />
      {withWordmark && (
        <span
          className={`text-xl font-bold tracking-[0.18em] ${textCls}`}
        >
          UPIN
        </span>
      )}
    </div>
  );
}
