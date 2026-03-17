import { prisma } from "../../../lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const placement = searchParams.get("placement")
    const device = searchParams.get("device") || "desktop"
    const limit = Math.min(parseInt(searchParams.get("limit") || "1"), 10)

    if (!placement) {
      return Response.json({ error: "Placement is required" }, { status: 400 })
    }

    // Fetch ads with device targeting
    const ads = await prisma.advertisement.findMany({
      where: {
        placement,
        active: true,
        // Don't require approval - show all ads immediately
        deviceTarget: {
          in: ["all", device === "mobile" ? "mobile_only" : `${device}_only`],
        },
      },
      include: {
        images: {
          // Include all images, we'll pick the right one after
          take: 5,
        },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: limit,
    })

    // Format response with the best image for the device
    const adsWithImages = ads.map((ad) => {
      // Try to get device-specific image first, fall back to any available
      let bestImage = ad.images.find(img => img.variant === device)
      if (!bestImage) {
        bestImage = ad.images.find(img => img.variant === "desktop")
      }
      if (!bestImage && ad.images.length > 0) {
        bestImage = ad.images[0]
      }

      return {
        id: ad.id,
        title: ad.title,
        redirectUrl: ad.redirectUrl,
        placement: ad.placement,
        imageUrl: bestImage?.imageUrl || null,
        images: ad.images,
      }
    })

    // Log impression for tracking
    if (adsWithImages.length > 0) {
      for (const ad of adsWithImages) {
        await prisma.advertisement.update({
          where: { id: ad.id },
          data: { impressions: { increment: 1 } },
        })
      }
    }

    return Response.json(adsWithImages)
  } catch (error) {
    console.error("Error fetching ads:", error)
    return Response.json({ error: "Failed to fetch ads" }, { status: 500 })
  }
}
