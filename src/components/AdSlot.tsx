'use client'

import { useEffect, useState } from 'react'
import AdCard from './AdCard'

interface AdSlotProps {
  placement: string
  mobileWidth?: string | number
  tabletWidth?: string | number
  desktopWidth?: string | number
}

// Ad dimension presets for standard IAB sizes
const AD_SIZES: Record<string, { desktop: [number, number]; tablet: [number, number]; mobile: [number, number] }> = {
  header_banner: {
    desktop: [970, 90],
    tablet: [728, 90],
    mobile: [320, 50],
  },
  match_inline: {
    desktop: [728, 90],
    tablet: [468, 60],
    mobile: [320, 50],
  },
  sidebar_top: {
    desktop: [300, 250],
    tablet: [300, 250],
    mobile: [300, 250],
  },
  sidebar_middle: {
    desktop: [300, 250],
    tablet: [300, 250],
    mobile: [300, 250],
  },
  footer_banner: {
    desktop: [970, 90],
    tablet: [728, 90],
    mobile: [320, 50],
  },
}

export default function AdSlot({
  placement,
  mobileWidth = '100%',
  tabletWidth = '100%',
  desktopWidth = '100%',
}: AdSlotProps) {
  const [ads, setAds] = useState<any[]>([])
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get ad dimensions based on window width
  const getDeviceInfo = (width: number): ['mobile' | 'tablet' | 'desktop', [number, number]] => {
    const sizes = AD_SIZES[placement] || AD_SIZES.header_banner
    
    if (width < 600) {
      return ['mobile', sizes.mobile]
    } else if (width < 1024) {
      return ['tablet', sizes.tablet]
    } else {
      return ['desktop', sizes.desktop]
    }
  }

  const currentDevice = deviceType || 'desktop'
  const sizes = AD_SIZES[placement] || AD_SIZES.header_banner
  const [width, height] = currentDevice === 'mobile' ? sizes.mobile : currentDevice === 'tablet' ? sizes.tablet : sizes.desktop

  // Setup resize listener and detect device - ONLY on client
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const [device] = getDeviceInfo(newWidth)
      setDeviceType(device)
    }

    // Call immediately
    handleResize()

    // Listen for resize
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [placement])

  // Fetch ads when device type changes
  useEffect(() => {
    // Only fetch if we've detected device type
    if (!deviceType) {
      setIsLoading(true)
      return
    }

    const fetchAds = async () => {
      try {
        setIsLoading(true)
        const device = deviceType || 'desktop'
        const response = await fetch(`/api/ads?placement=${placement}&device=${device}`)

        if (response.ok) {
          const data = await response.json()
          setAds(data || [])
        } else {
          console.error('Failed to fetch ads:', response.status)
          setAds([])
        }
      } catch (error) {
        console.error('Failed to fetch ads:', error)
        setAds([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAds()
  }, [placement, deviceType])

  // Determine actual width for container
  let containerWidth: string | number
  if (deviceType === 'mobile') containerWidth = mobileWidth
  else if (deviceType === 'tablet') containerWidth = tabletWidth
  else containerWidth = desktopWidth

  // Container styling - responsive
  const containerStyle: React.CSSProperties = {
    width: containerWidth,
    maxWidth: '100%',
    aspectRatio: `${width} / ${height}`,
    margin: '20px auto',
    padding: 0,
    border: '2px dashed #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    fontSize: '14px',
    color: '#999',
    position: 'relative',
    transition: 'all 0.3s ease',
  }

  // Don't render until we know the device type to avoid hydration mismatch
  if (!deviceType) {
    return (
      <div 
        style={containerStyle}
        suppressHydrationWarning
      >
        <div style={{ fontSize: '12px', color: '#bbb' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#bbb' }}>Loading ad...</div>
        </div>
      ) : ads.length > 0 ? (
        <AdCard ad={ads[0]} />
      ) : (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <p style={{ margin: '5px 0', fontSize: '13px', fontWeight: 'bold' }}>
            {placement.replace('_', ' ').toUpperCase()}
          </p>
          <p style={{ fontSize: '11px', margin: '5px 0 0 0', color: '#bbb' }}>
            {width}x{height} · {deviceType}
          </p>
        </div>
      )}
    </div>
  )
}