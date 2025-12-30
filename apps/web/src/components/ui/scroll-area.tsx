"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = ScrollAreaPrimitive.Root;

function ScrollAreaViewport({
  className,
  ...props
}: ScrollAreaPrimitive.Viewport.Props) {
  return (
    <ScrollAreaPrimitive.Viewport
      className={cn(
        "size-full overflow-scroll rounded-[inherit] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      data-slot="scroll-area-viewport"
      {...props}
    />
  );
}

function ScrollAreaScrollbar({
  className,
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "z-50 flex touch-none select-none p-px transition-opacity duration-150 ease-in-out data-orientation-horizontal:h-2.5 data-orientation-vertical:w-2.5",
        className,
      )}
      data-slot="scroll-area-scrollbar"
      {...props}
    />
  );
}

function ScrollAreaThumb({
  className,
  ...props
}: ScrollAreaPrimitive.Thumb.Props) {
  return (
    <ScrollAreaPrimitive.Thumb
      className={cn(
        "relative flex-1 rounded-full bg-border transition-colors hover:bg-border/80 active:bg-border/90",
        className,
      )}
      data-slot="scroll-area-thumb"
      {...props}
    />
  );
}

export {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};
