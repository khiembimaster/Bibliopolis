/*
  Warnings:

  - Added the required column `shipping_fee` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `shipping_fee` DECIMAL(65, 30) NOT NULL;
