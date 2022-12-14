-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "canBeUsed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);
