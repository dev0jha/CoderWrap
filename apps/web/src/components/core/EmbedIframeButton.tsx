'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogPopup, DialogHeader, DialogTitle, DialogPanel } from '@/components/ui/dialog'
import { CodeIcon, CopyIcon, CheckIcon } from 'lucide-react'

interface EmbedIframeButtonProps {
  username: string
  year: number
}

export function EmbedIframeButton({ username, year }: EmbedIframeButtonProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  
  // Get the current origin (works on both client and server)
  const getOrigin = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return 'http://localhost:3000' // fallback for SSR
  }

  const iframeCode = `<iframe 
  src="${getOrigin()}/warp/${username}/${year}" 
  width="100%" 
  height="800" 
  frameborder="0" 
  scrolling="auto"
  title="${username}'s ${year} GitHub Wrap"
></iframe>`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <CodeIcon className="w-4 h-4 mr-2" />
            Embed Code
          </Button>
        }
      />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Embed This Wrap</DialogTitle>
        </DialogHeader>
        <DialogPanel className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Copy the code below to embed this GitHub Wrap on your website:
          </p>
          
          <div className="relative">
            <pre className="bg-secondary/50 border rounded-lg p-4 overflow-x-auto text-xs">
              <code>{iframeCode}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
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

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">Preview:</h4>
            <div className="bg-white dark:bg-gray-950 rounded border overflow-hidden">
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
  )
}
