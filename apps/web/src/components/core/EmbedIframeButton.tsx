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
            className={iconOnly ? "" : "w-full sm:w-auto"}
            title={iconOnly ? "Embed Code" : undefined}
          >
            <CodeIcon className={iconOnly ? "w-5 h-5" : "w-4 h-4 mr-2"} />
            {!iconOnly && "Embed Code"}
          </Button>
        }
      />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="text-lg font-syne font-bold uppercase tracking-tighter">
            Embed_Code
          </DialogTitle>
        </DialogHeader>
        <DialogPanel className="space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-geist-mono">
            Copy the code below to embed this wrap on your site.
          </p>

          <div className="relative">
            <pre className="bg-secondary/50 border border-border rounded-none p-4 overflow-x-auto text-xs font-geist-mono">
              <code>{iframeCode}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 rounded-none"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="bg-foreground/2 border border-border rounded-none p-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground mb-3">
              Preview
            </h4>
            <div className="bg-background rounded-none border border-border overflow-hidden">
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
