// AdCard.tsx - Improved with image optimization and responsive features
'use client'

import { useState } from 'react'

interface AdCardProps {
  ad: {
    id: string
    title: string
    imageUrl: string
    redirectUrl: string
    placement: string
  }
  width?: number
  height?: number
}

export default function AdCard({ ad, width = 300, height = 250 }: AdCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleClick = () => {
    // Track ad click
    fetch(`/api/ads/${ad.id}/click`, { method: 'POST' }).catch(() => {})
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          fontSize: '12px',
          color: '#666',
        }}
      >
        Ad unavailable
      </div>
    )
  }

  return (
    <a
      href={ad.redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
      title={ad.title}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#e0e0e0',
            animation: 'pulse 1.5s infinite',
          }}
        />
      )}

      {/* Responsive Image */}
      <img
        src={ad.imageUrl}
        alt={ad.title}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: isLoading ? 'none' : 'block',
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </a>
  )
}
