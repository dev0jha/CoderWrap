"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogPanel,
} from "@/components/ui/dialog";
import { CodeIcon, CopyIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmbedIframeButtonProps {
  username: string;
  year: number;
  iconOnly?: boolean;
}

export function EmbedIframeButton({
  username,
  year,
  iconOnly = false,
}: EmbedIframeButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  // Get the current origin (works on both client and server)
  const getOrigin = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "http://localhost:3000"; // fallback for SSR
  };

  const iframeCode = `<iframe 
  src="${getOrigin()}/warp/${username}/${year}" 
  width="100%" 
  height="800" 
  frameborder="0" 
  scrolling="auto"
  title="${username}'s ${year} GitHub Wrap"
></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size={iconOnly ? "icon" : "lg"}
            variant="outline"
            className={cn(
              "rounded-none border-border font-geist-mono uppercase tracking-widest text-[10px]",
              iconOnly ? "" : "w-full sm:w-auto h-12 px-8",
            )}
            title={iconOnly ? "EMBED_CODE" : undefined}
          >
            <CodeIcon className={iconOnly ? "w-4 h-4" : "w-3 h-3 mr-3"} />
            {!iconOnly && "EMBED_CODE"}
          </Button>
        }
      />
      <DialogPopup className="rounded-none border-border bg-background p-0 overflow-hidden max-w-xl">
        <DialogHeader className="p-8 border-b border-border">
          <DialogTitle className="font-syne font-bold uppercase tracking-tighter text-2xl">
            Embed Logic
          </DialogTitle>
        </DialogHeader>
        <DialogPanel className="p-8 space-y-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono">
            Copy the source fragment to integrate this report.
          </p>

          <div className="relative group">
            <pre className="bg-muted/50 border border-border rounded-none p-6 overflow-x-auto text-[10px] font-geist-mono leading-relaxed text-foreground select-all">
              <code>{iframeCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-4 right-4 rounded-none h-8 px-4 font-geist-mono text-[9px] uppercase tracking-widest bg-background"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckIcon className="w-3 h-3 mr-2" />
                  COPIED
                </>
              ) : (
                <>
                  <CopyIcon className="w-3 h-3 mr-2" />
                  COPY_SRC
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground">
              Preview_Render:
            </h4>
            <div className="border border-border rounded-none overflow-hidden grayscale opacity-50 hover:opacity-100 transition-all duration-500">
              <iframe
                src={`${getOrigin()}/warp/${username}/${year}`}
                width="100%"
                height="300"
                className="border-0"
                title="Preview"
              />
            </div>
          </div>
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
}
