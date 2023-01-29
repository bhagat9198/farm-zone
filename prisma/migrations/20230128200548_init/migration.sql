/*
  Warnings:

  - You are about to drop the column `farm_name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `brand_name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrp` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "farm_name",
ADD COLUMN     "brand_name" TEXT NOT NULL,
ADD COLUMN     "inStock" BOOLEAN NOT NULL,
ADD COLUMN     "mrp" INTEGER NOT NULL;
