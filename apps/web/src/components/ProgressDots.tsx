"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
}

export default function ProgressDots({
  total,
  current,
  onDotClick,
}: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          className={cn(
            "relative transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-foreground focus:ring-offset-1",
            index === current
              ? "w-4 h-1"
              : "w-2 h-1 opacity-20 hover:opacity-50",
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? "true" : "false"}
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor:
                index === current
                  ? "var(--foreground)"
                  : "var(--muted-foreground)",
            }}
            className="w-full h-full rounded-none"
          />
        </button>
      ))}
    </div>
  );
}
