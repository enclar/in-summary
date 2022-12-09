/*
  Warnings:

  - You are about to drop the column `cardSubtitle` on the `Checkpoint` table. All the data in the column will be lost.
  - You are about to drop the column `cardTitle` on the `Checkpoint` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Checkpoint` table. All the data in the column will be lost.
  - Added the required column `date` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoint" DROP COLUMN "cardSubtitle",
DROP COLUMN "cardTitle",
DROP COLUMN "title",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "details" TEXT NOT NULL;
