import { prisma } from "../../../../lib/prisma"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(req: Request) {

  const formData = await req.formData()

  const file = formData.get("file") as File
  const title = formData.get("title") as string
  const redirectUrl = formData.get("redirectUrl") as string
  const placement = formData.get("placement") as string

  if (!file) {
    return new Response("No file uploaded", { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filePath = path.join(process.cwd(), "public/storage/ads", file.name)

  await writeFile(filePath, buffer)

  await prisma.advertisement.create({
    data: {
      title,
      imageUrl: `/storage/ads/${file.name}`,
      redirectUrl,
      placement
    }
  })

  return new Response("Ad uploaded successfully")
}