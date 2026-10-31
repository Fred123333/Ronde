import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  as: Tag = "div",
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-6",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}