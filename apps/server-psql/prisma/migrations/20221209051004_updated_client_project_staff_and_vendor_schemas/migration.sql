/*
  Warnings:

  - You are about to drop the column `date` on the `Project` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccType" AS ENUM ('staff', 'client', 'vendor');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "accType" "AccType" NOT NULL DEFAULT 'client';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "accType" "AccType" NOT NULL DEFAULT 'staff';

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "accType" "AccType" NOT NULL DEFAULT 'vendor';
