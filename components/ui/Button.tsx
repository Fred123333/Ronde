"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-petrol-600 text-surface hover:bg-petrol-700 active:bg-petrol-700 shadow-soft",
  secondary:
    "bg-surface text-ink border border-line hover:border-petrol-400 hover:text-petrol-700 shadow-soft",
  ghost: "bg-transparent text-ink-soft hover:text-ink hover:bg-petrol-50",
  danger:
    "bg-terra-500 text-surface hover:bg-terra-600 active:bg-terra-600 shadow-soft",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 ease-ease disabled:opacity-50 disabled:pointer-events-none active:translate-y-px hover:-translate-y-px hover:shadow-lifted";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

type LinkButtonProps = CommonProps & { href: string; "aria-label"?: string };

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}