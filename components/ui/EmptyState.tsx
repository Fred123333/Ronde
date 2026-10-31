import { IconClipboardOff } from "@tabler/icons-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-surface px-6 py-12 text-center">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-petrol-50 text-petrol-600">
        <IconClipboardOff size={24} stroke={1.75} aria-hidden />
      </span>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}