'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toPng } from 'html-to-image'
import { DownloadIcon, Loader2 } from 'lucide-react'


interface DownloadWrapButtonProps {
  username: string
  year: number
  iconOnly?: boolean
}

export function DownloadWrapButton({
  username,
  year,
  iconOnly = false,
}: DownloadWrapButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      const node = document.getElementById('download-card-container')
      if (!node) throw new Error('Download card not found')

      node.style.opacity = '1'
      node.style.zIndex = '9999'

      await new Promise(resolve => setTimeout(resolve, 500))

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        width: 800,
        height: 800,
        skipFonts: false,
      })

      node.style.opacity = '0'
      node.style.zIndex = '-1'

      const link = document.createElement('a')
      link.download = `${username}-coderwrap-${year}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error(err)
      alert('Failed to generate image')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      size={iconOnly ? "icon" : "lg"}
      variant="outline"
      onClick={handleDownload}
      disabled={isDownloading}
      className={iconOnly ? "" : "w-full sm:w-auto"}
      title={iconOnly ? "Download as PNG" : undefined}
    >
      {isDownloading ? (
        iconOnly ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating…
          </>
        )
      ) : (
        iconOnly ? (
          <DownloadIcon className="w-5 h-5" />
        ) : (
          <>
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download as PNG
          </>
        )
      )}
    </Button>
  )
}
