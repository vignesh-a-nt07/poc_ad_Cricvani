import { prisma } from "../../../lib/prisma"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const placement = searchParams.get("placement")

  const ads = await prisma.advertisement.findMany({
    where: {
      placement: placement || undefined,
      active: true
    }
  })

  return Response.json(ads)
}
