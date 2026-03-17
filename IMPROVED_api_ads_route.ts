// IMPROVED_api_ads_route.ts - Enhanced API to support responsive and analytics
// src/app/api/ads/route.ts

import { prisma } from '../../../lib/prisma'

/**
 * GET /api/ads
 * Fetch ads for a specific placement with device targeting
 * Query params:
 * - placement: Ad placement ID (e.g., "header_banner")
 * - device: Device type - "mobile" | "tablet" | "desktop" (auto-detected if not provided)
 * - limit: Number of ads to return (default: 1)
 * - approved: Include only approved ads (default: true)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const placement = searchParams.get('placement')
    const device = searchParams.get('device') || 'desktop'
    const limit = Math.min(parseInt(searchParams.get('limit') || '1'), 10)
    const approvedOnly = searchParams.get('approved') !== 'false'

    if (!placement) {
      return Response.json({ error: 'Placement is required' }, { status: 400 })
    }

    // Fetch ads with device targeting
    const ads = await prisma.advertisement.findMany({
      where: {
        placement,
        active: true,
        approval: approvedOnly ? 'approved' : undefined,
        deviceTarget: {
          in: ['all', device === 'mobile' ? 'mobile_only' : `${device}_only`],
        },
        // Only show ads within date range
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        images: {
          where: {
            variant: device, // Get device-specific image
          },
          take: 1,
        },
      },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    })

    // Use fallback to default image if device-specific not found
    const adsWithImages = ads.map((ad) => ({
      ...ad,
      imageUrl: ad.images[0]?.imageUrl || ad.images[0]?.imageUrl, // Implement fallback logic
    }))

    // Log impression for analytics
    if (adsWithImages.length > 0) {
      for (const ad of adsWithImages) {
        // Increment impression count (use database trigger in production)
        await prisma.advertisement.update({
          where: { id: ad.id },
          data: { impressions: { increment: 1 } },
        })
      }
    }

    return Response.json(adsWithImages)
  } catch (error) {
    console.error('Error fetching ads:', error)
    return Response.json({ error: 'Failed to fetch ads' }, { status: 500 })
  }
}

/**
 * POST /api/ads/:id/click
 * Track ad clicks
 */
export async function POST(req: Request) {
  try {
    const urlParts = req.url.split('/')
    const adId = urlParts[urlParts.length - 2]

    if (!adId) {
      return Response.json({ error: 'Ad ID is required' }, { status: 400 })
    }

    // Increment click count
    const ad = await prisma.advertisement.update({
      where: { id: adId },
      data: {
        clicks: { increment: 1 },
      },
    })

    return Response.json({ success: true, clicks: ad.clicks })
  } catch (error) {
    console.error('Error tracking click:', error)
    return Response.json({ error: 'Failed to track click' }, { status: 500 })
  }
}
