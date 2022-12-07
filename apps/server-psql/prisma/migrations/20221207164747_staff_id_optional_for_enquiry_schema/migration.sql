-- DropForeignKey
ALTER TABLE "Enquiry" DROP CONSTRAINT "Enquiry_staffId_fkey";

-- AlterTable
ALTER TABLE "Enquiry" ALTER COLUMN "staffId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
