import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with test ads...')

  // Create test ads for different placements
  const ads = [
    {
      title: 'Cricket Live - IPL 2026',
      redirectUrl: 'https://example.com/ipl',
      placement: 'header_banner',
      imageUrl: 'https://via.placeholder.com/970x90?text=Cricket+Live+Header',
    },
    {
      title: 'Fantasy Cricket League',
      redirectUrl: 'https://example.com/fantasy',
      placement: 'match_inline',
      imageUrl: 'https://via.placeholder.com/728x90?text=Fantasy+Cricket',
    },
    {
      title: 'Sports Betting App',
      redirectUrl: 'https://example.com/betting',
      placement: 'sidebar_top',
      imageUrl: 'https://via.placeholder.com/300x250?text=Sports+Betting',
    },
    {
      title: 'Premium Membership',
      redirectUrl: 'https://example.com/premium',
      placement: 'sidebar_middle',
      imageUrl: 'https://via.placeholder.com/300x250?text=Premium+Member',
    },
    {
      title: 'Cricket News Daily',
      redirectUrl: 'https://example.com/news',
      placement: 'footer_banner',
      imageUrl: 'https://via.placeholder.com/970x90?text=Cricket+News',
    },
  ]

  for (const ad of ads) {
    const created = await prisma.advertisement.create({
      data: {
        title: ad.title,
        redirectUrl: ad.redirectUrl,
        placement: ad.placement,
        active: true,
        deviceTarget: 'all',
        approval: 'approved',
        priority: Math.floor(Math.random() * 10),
        images: {
          create: {
            variant: 'desktop',
            imageUrl: ad.imageUrl,
            width: ad.placement.includes('sidebar') ? 300 : 970,
            height: ad.placement.includes('sidebar') ? 250 : 90,
            fileSize: 50000,
            format: 'jpg',
          },
        },
      },
      include: { images: true },
    })

    console.log(`✅ Created ad: ${created.title} (${created.placement})`)
  }

  console.log('✅ Database seeded with 5 test ads!')
  console.log('🎉 Ads should now display on http://localhost:3000')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
