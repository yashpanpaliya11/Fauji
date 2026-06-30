import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { cn } from "../lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}

export function MagneticButton({ children, className, variant = "primary", ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-accent text-white hover:bg-orange-600 border border-transparent",
    outline: "bg-transparent text-primary-text border border-white/20 hover:border-white/50",
    ghost: "bg-transparent text-primary-text hover:text-accent",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-4 font-medium transition-colors duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 block pointer-events-none">{children}</span>
    </motion.button>
  );
}
