/*
  Warnings:

  - Changed the type of `doneBy` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "doneBy",
ADD COLUMN     "doneBy" TEXT NOT NULL;
