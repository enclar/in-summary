/*
  Warnings:

  - You are about to drop the column `clientId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Contact` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_vendorId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "clientId",
DROP COLUMN "vendorId";

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContactToVendor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClientToContact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToVendor_AB_unique" ON "_ContactToVendor"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToVendor_B_index" ON "_ContactToVendor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientToContact_AB_unique" ON "_ClientToContact"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientToContact_B_index" ON "_ClientToContact"("B");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToVendor" ADD CONSTRAINT "_ContactToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToVendor" ADD CONSTRAINT "_ContactToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientToContact" ADD CONSTRAINT "_ClientToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientToContact" ADD CONSTRAINT "_ClientToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
