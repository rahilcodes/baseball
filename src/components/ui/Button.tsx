import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--crimson-400)] text-white",
    "hover:bg-[var(--crimson-500)] active:bg-[var(--crimson-600)]",
    "shadow-[0_0_24px_rgba(227,27,35,0.35)]",
    "hover:shadow-[0_0_32px_rgba(227,27,35,0.5)]",
    "border border-transparent",
  ].join(" "),
  secondary: [
    "bg-[rgba(255,255,255,0.1)] text-white",
    "hover:bg-[rgba(255,255,255,0.15)]",
    "border border-[rgba(255,255,255,0.12)]",
  ].join(" "),
  outline: [
    "bg-transparent text-white",
    "border border-[rgba(255,255,255,0.15)]",
    "hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.25)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--slate-400)]",
    "hover:text-white hover:bg-[rgba(255,255,255,0.06)]",
    "border border-transparent",
  ].join(" "),
  danger: [
    "bg-[var(--crimson-600)] text-white",
    "hover:bg-[var(--crimson-500)]",
    "border border-[var(--crimson-600)]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-sm gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
  xl: "h-14 px-8 text-base gap-3",
};

// Allow rendering as anchor via asChild
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & { asChild?: boolean; href?: string; children?: React.ReactNode }
>(function Button(
  { variant = "primary", size = "md", loading, className, disabled, asChild, children, ...props },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold rounded-xl",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--crimson-400)]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "select-none whitespace-nowrap",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    const { style: propStyle, ...restProps } = props as { style?: React.CSSProperties; [key: string]: unknown };
    return React.cloneElement(children as React.ReactElement<{ className?: string; style?: React.CSSProperties; ref?: React.Ref<unknown> }>, {
      className: cn(classes, (children.props as { className?: string }).className),
      style: { ...(propStyle ?? {}), ...((children.props as { style?: React.CSSProperties }).style ?? {}) },
      ref,
      ...restProps,
    });
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
});
