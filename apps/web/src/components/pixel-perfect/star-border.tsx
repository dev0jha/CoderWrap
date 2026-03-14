import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StarBordersProps = {
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
};

const StarBorders = ({
  className,
  contentClassName,
  children,
}: StarBordersProps) => {
  return (
    <div
      className={cn("relative h-full w-full border border-dashed", className)}
    >
      <Star className="absolute -top-[7.9px] -right-[7.6px] z-50" />
      <Star className="absolute -bottom-2 -right-[7.8px] z-50" />
      <Star className="absolute -top-[7.9px] -left-[7.8px] z-50" />
      <Star className="absolute -bottom-2 -left-[7.8px] z-50" />
      {children ? (
        <div className={cn("relative z-10", contentClassName)}>{children}</div>
      ) : null}
    </div>
  );
};

export default StarBorders;

const Star = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-4 h-4 text-muted ", className)}>
      <svg viewBox="0 0 30 30" className="w-full h-full ">
        <path
          fill="currentColor"
          d="
          M15 0
          C19 9 21 11 30 15
          C21 19 19 21 15 30
          C11 21 9 19 0 15
          C9 11 11 9 15 0
          Z
          "
        />
      </svg>
    </div>
  );
};
