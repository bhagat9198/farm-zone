/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_uid_key" ON "Customer"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Order_uid_key" ON "Order"("uid");
