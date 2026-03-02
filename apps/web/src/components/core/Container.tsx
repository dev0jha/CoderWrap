import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-5xl mx-auto px-6 sm:px-10", className)}>
      {children}
    </div>
  );
}
