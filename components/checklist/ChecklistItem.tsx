"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function ChecklistItem({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <li>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-sm border p-3 transition-all duration-200 ease-ease",
          "hover:-translate-y-px hover:shadow-soft",
          checked
            ? "border-petrol-100 bg-petrol-50"
            : "border-line bg-surface hover:border-petrol-400"
        )}
      >
        <span
          className={cn(
            "relative mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200 ease-ease",
            checked
              ? "border-petrol-600 bg-petrol-600"
              : "border-line bg-surface"
          )}
        >
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <motion.svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-surface"
            initial={false}
            aria-hidden
          >
            <motion.path
              d="M5 12.5 L10 17 L19 7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                checked
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.svg>
        </span>
        <span className="flex flex-col">
          <span
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              checked ? "text-petrol-700" : "text-ink"
            )}
          >
            {label}
          </span>
          {hint ? (
            <span className="mt-1 text-xs text-ink-soft">{hint}</span>
          ) : null}
        </span>
      </label>
    </li>
  );
}