/*
  Warnings:

  - The required column `chatKey` was added to the `Amizade` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `amizade` ADD COLUMN `chatKey` VARCHAR(191) NOT NULL;
