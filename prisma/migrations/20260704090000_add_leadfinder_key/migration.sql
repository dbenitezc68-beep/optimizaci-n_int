-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "leadfinderKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lead_leadfinderKey_key" ON "Lead"("leadfinderKey");
