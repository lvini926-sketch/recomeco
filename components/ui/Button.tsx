import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-petroleo-900 text-areia-50 hover:bg-petroleo-700 active:bg-petroleo-950",
  secondary:
    "bg-aurora-500 text-petroleo-950 hover:bg-aurora-600 active:bg-aurora-600",
  ghost:
    "bg-transparent text-petroleo-900 border border-petroleo-300 hover:bg-petroleo-100",
};

export default function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`flex w-full items-center justify-center gap-3 rounded-acolhedor px-6 py-4 text-base font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
