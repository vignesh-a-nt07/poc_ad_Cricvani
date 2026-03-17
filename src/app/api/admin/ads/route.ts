import { prisma } from "../../../../lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const redirectUrl = formData.get("redirectUrl") as string
    const placement = formData.get("placement") as string
    const deviceTarget = (formData.get("deviceTarget") as string) || "all"

    console.log("📝 Upload attempt:", { title, placement, fileName: file?.name })

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (!title || !redirectUrl || !placement) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure directory exists
    const storageDir = path.join(process.cwd(), "public/storage/ads")
    try {
      await mkdir(storageDir, { recursive: true })
    } catch (dirError) {
      console.error("❌ Failed to create storage directory:", dirError)
    }

    // Save file with unique name
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filePath = path.join(storageDir, filename)

    console.log("💾 Saving file to:", filePath)
    await writeFile(filePath, buffer)
    console.log("✅ File saved successfully")

    // Create advertisement - auto-approve for immediate display
    console.log("📊 Creating advertisement in database...")
    const ad = await prisma.advertisement.create({
      data: {
        title,
        redirectUrl,
        placement,
        deviceTarget,
        approval: "approved", // Auto-approve for immediate display
        images: {
          create: {
            variant: "desktop", // Default variant - will work for all devices
            imageUrl: `/storage/ads/${filename}`,
            width: 970,
            height: 90,
            fileSize: buffer.length,
            format: file.type.split("/")[1] || "jpg",
          },
        },
      },
      include: {
        images: true,
      },
    })

    console.log("✅ Advertisement created:", ad.id)
    console.log("📄 Ad Details:", { title: ad.title, placement: ad.placement, approved: ad.approval })

    return new Response(JSON.stringify({
      success: true,
      message: "✅ Ad uploaded and now visible on site!",
      ad,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error("❌ Error uploading ad:", error)
    
    // Better error reporting
    let errorMessage = "Failed to upload ad"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.message : String(error)
    }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
