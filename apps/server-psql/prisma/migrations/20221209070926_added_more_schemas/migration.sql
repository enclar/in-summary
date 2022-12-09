/*
  Warnings:

  - You are about to drop the column `date` on the `Checkpoint` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Checkpoint` table. All the data in the column will be lost.
  - Added the required column `cardTitle` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoint" DROP COLUMN "date",
DROP COLUMN "description",
ADD COLUMN     "cardSubtitle" TEXT,
ADD COLUMN     "cardTitle" TEXT NOT NULL,
ADD COLUMN     "title" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "doneBy" "AccType" NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
