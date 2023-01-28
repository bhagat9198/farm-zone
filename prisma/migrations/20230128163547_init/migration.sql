/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Farmer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Farmer_uid_key" ON "Farmer"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_uid_key" ON "Product"("uid");
