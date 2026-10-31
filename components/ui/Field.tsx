"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
  className?: string;
}

export function Field({ label, error, hint, children, className }: FieldProps) {
  const id = useId();
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children(id, describedBy)}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-terra-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  id,
  describedBy,
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  describedBy?: string;
  invalid?: boolean;
}) {
  return (
    <input
      id={id}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-11 w-full rounded-sm border bg-surface px-3 text-sm text-ink transition-colors duration-200 ease-ease",
        "placeholder:text-ink-faint",
        "hover:border-petrol-400 focus:border-petrol-600 focus:outline-none focus:ring-2 focus:ring-petrol-600/30",
        invalid ? "border-terra-500" : "border-line",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  id,
  describedBy,
  invalid,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  describedBy?: string;
  invalid?: boolean;
}) {
  return (
    <textarea
      id={id}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={cn(
        "min-h-[88px] w-full rounded-sm border bg-surface px-3 py-2 text-sm text-ink transition-colors duration-200 ease-ease",
        "placeholder:text-ink-faint",
        "hover:border-petrol-400 focus:border-petrol-600 focus:outline-none focus:ring-2 focus:ring-petrol-600/30",
        invalid ? "border-terra-500" : "border-line",
        className
      )}
      {...props}
    />
  );
}