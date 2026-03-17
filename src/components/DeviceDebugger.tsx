'use client'

import { useEffect, useState } from 'react'

export default function DeviceDebugger() {
  const [info, setInfo] = useState<{
    width: number
    height: number
    device: string
    ua: string
  } | null>(null)

  useEffect(() => {
    const updateInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const ua = navigator.userAgent
      
      let device = 'desktop'
      if (width < 600) device = 'mobile'
      else if (width < 1024) device = 'tablet'

      setInfo({
        width,
        height,
        device,
        ua: ua.substring(0, 50),
      })
    }

    updateInfo()
    window.addEventListener('resize', updateInfo)
    return () => window.removeEventListener('resize', updateInfo)
  }, [])

  if (!info) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        backgroundColor: '#1e3a8a',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '6px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        maxWidth: '200px',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>📱 Device Info</div>
      <div>Screen: {info.width}x{info.height}px</div>
      <div>Device: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{info.device.toUpperCase()}</span></div>
      <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.8 }}>
        {info.ua}
      </div>
    </div>
  )
}
