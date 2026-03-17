/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Advertisement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "imageUrl",
ADD COLUMN     "approval" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deviceTarget" TEXT NOT NULL DEFAULT 'all',
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "impressions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "AdImage" (
    "id" TEXT NOT NULL,
    "advertisementId" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdImage_format_idx" ON "AdImage"("format");

-- CreateIndex
CREATE UNIQUE INDEX "AdImage_advertisementId_variant_key" ON "AdImage"("advertisementId", "variant");

-- CreateIndex
CREATE INDEX "Advertisement_placement_active_approval_idx" ON "Advertisement"("placement", "active", "approval");

-- CreateIndex
CREATE INDEX "Advertisement_deviceTarget_idx" ON "Advertisement"("deviceTarget");

-- AddForeignKey
ALTER TABLE "AdImage" ADD CONSTRAINT "AdImage_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
