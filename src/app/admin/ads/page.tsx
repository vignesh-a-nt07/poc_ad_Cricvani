'use client'

import { useState } from 'react'

export default function AdminAdsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const form = e.currentTarget  // save ref before await

    try {
      const formData = new FormData(form)
      const response = await fetch('/api/admin/ads', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ ' + data.message)
        form.reset()
      } else {
        setMessage('❌ ' + (data.error || data.details || 'Failed to upload ad'))
        console.error('Upload error:', data)
      }
    } catch (error) {
      setMessage('❌ Error uploading ad: ' + (error instanceof Error ? error.message : 'Unknown error'))
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Upload Advertisement</h1>

      {message && (
        <div
          style={{
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '4px',
            backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Basic Info */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Ad Title *
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter ad title"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Redirect URL */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Redirect URL *
          </label>
          <input
            type="url"
            name="redirectUrl"
            placeholder="https://example.com"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Placement */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Ad Placement *
          </label>
          <select
            name="placement"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          >
            <option value="">Select placement...</option>
            <option value="header_banner">Header Banner (970x90 / 728x90 / 320x50)</option>
            <option value="match_inline">Match Inline (728x90 / 468x60 / 320x50)</option>
            <option value="sidebar_top">Sidebar Top (300x250)</option>
            <option value="sidebar_middle">Sidebar Middle (300x250)</option>
            <option value="footer_banner">Footer Banner (970x90 / 728x90 / 320x50)</option>
          </select>
        </div>

        {/* Device Target */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Target Devices
          </label>
          <select
            name="deviceTarget"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          >
            <option value="all">All Devices (Desktop, Tablet, Mobile)</option>
            <option value="desktop_only">Desktop Only</option>
            <option value="tablet_only">Tablet Only</option>
            <option value="mobile_only">Mobile Only</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Upload Image *
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          />
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            Recommended: Upload properly sized images (e.g., 970x90 for desktop banners, 320x50 for mobile)
          </small>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {isSubmitting ? 'Uploading...' : 'Upload Ad'}
        </button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h2>Important Notes</h2>
      <ul style={{ color: '#666', lineHeight: '1.8' }}>
        <li>✓ Ads display immediately after upload</li>
        <li>Mobile: Responsive design automatically adapts ads to screen size</li>
        <li>Mobile users see optimized smaller ads (320x50)</li>
        <li>Desktop users see large ads (970x90)</li>
        <li>Images should be optimized (JPG/PNG, less than 500KB)</li>
      </ul>
    </div>
  )
}
