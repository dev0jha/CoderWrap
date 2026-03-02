"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toPng } from "html-to-image";
import { DownloadIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadWrapButtonProps {
  username: string;
  year: number;
  iconOnly?: boolean;
}

export function DownloadWrapButton({
  username,
  year,
  iconOnly = false,
}: DownloadWrapButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const node = document.getElementById("download-card-container");
      if (!node) throw new Error("Download card not found");

      node.style.opacity = "1";
      node.style.zIndex = "9999";

      await new Promise((resolve) => setTimeout(resolve, 500));

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#121212",
        width: 800,
        height: 800,
        skipFonts: false,
      });

      node.style.opacity = "0";
      node.style.zIndex = "-1";

      const link = document.createElement("a");
      link.download = `${username}-coderwrap-${year}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to generate image");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      size={iconOnly ? "icon" : "lg"}
      variant="outline"
      onClick={handleDownload}
      disabled={isDownloading}
      className={cn(
        "rounded-none border-border font-geist-mono uppercase tracking-widest text-[10px]",
        iconOnly ? "" : "w-full sm:w-auto h-12 px-8",
      )}
      title={iconOnly ? "DOWNLOAD_AS_PNG" : undefined}
    >
      {isDownloading ? (
        iconOnly ? (
          <Loader2 className="w-4 h-4 animate-spin grayscale" />
        ) : (
          <>
            <Loader2 className="w-3 h-3 mr-3 animate-spin grayscale" />
            PROCESSING...
          </>
        )
      ) : iconOnly ? (
        <DownloadIcon className="w-4 h-4" />
      ) : (
        <>
          <DownloadIcon className="w-3 h-3 mr-3" />
          DOWNLOAD_PNG
        </>
      )}
    </Button>
  );
}
