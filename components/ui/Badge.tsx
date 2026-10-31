import { cn } from "@/lib/cn";

type Tone = "petrol" | "terra" | "sage" | "neutral";

const TONES: Record<Tone, string> = {
  petrol: "bg-petrol-50 text-petrol-700",
  terra: "bg-terra-50 text-terra-600",
  sage: "bg-sage-50 text-sage-600",
  neutral: "bg-line/60 text-ink-soft",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}