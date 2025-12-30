'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toPng } from 'html-to-image'

interface DownloadWrapButtonProps {
  username: string
  year: number
}

export function DownloadWrapButton({
  username,
  year,
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
      size="lg"
      variant="outline"
      onClick={handleDownload}
      disabled={isDownloading}
      className="w-full sm:w-auto"
    >
      {isDownloading ? 'Generating…' : '📥 Download as PNG'}
    </Button>
  )
}
