import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-acolhedor bg-white/90 p-6 shadow-[0_8px_30px_-12px_rgba(14,58,65,0.25)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
