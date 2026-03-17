// AdSlot.tsx - Improved with responsive design
'use client'

import { useEffect, useState } from 'react'
import AdCard from './AdCard'

interface AdSlotProps {
  placement: string
  // Responsive width configurations
  mobileWidth?: string | number // 100% on mobile
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
  const [dimensions, setDimensions] = useState<[number, number]>([970, 90])
  const [windowWidth, setWindowWidth] = useState<number>(1200)

  // Get ad dimensions based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)

      const sizes = AD_SIZES[placement] || AD_SIZES.header_banner
      if (width < 768) {
        setDimensions(sizes.mobile)
      } else if (width < 1024) {
        setDimensions(sizes.tablet)
      } else {
        setDimensions(sizes.desktop)
      }
    }

    handleResize() // Initial call
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [placement])

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`/api/ads?placement=${placement}`)
        if (response.ok) {
          const data = await response.json()
          setAds(data)
        }
      } catch (error) {
        console.error('Failed to fetch ads:', error)
      }
    }

    fetchAds()
  }, [placement])

  const [width, height] = dimensions

  // Container styling - responsive
  const containerStyle: React.CSSProperties = {
    width: windowWidth < 768 ? mobileWidth : windowWidth < 1024 ? tabletWidth : desktopWidth,
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
  }

  return (
    <div style={containerStyle}>
      {ads.length > 0 ? (
        <AdCard ad={ads[0]} />
      ) : (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <p>{placement}</p>
          <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>
            {width}x{height}
          </p>
        </div>
      )}
    </div>
  )
}
