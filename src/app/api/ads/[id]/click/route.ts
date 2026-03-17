import { prisma } from "../../../../../lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return Response.json({ error: "Ad ID is required" }, { status: 400 })
    }

    // Increment click count
    const ad = await prisma.advertisement.update({
      where: { id },
      data: {
        clicks: { increment: 1 },
      },
    })

    return Response.json({ success: true, clicks: ad.clicks })
  } catch (error) {
    console.error("Error tracking click:", error)
    return Response.json({ error: "Failed to track click" }, { status: 500 })
  }
}
