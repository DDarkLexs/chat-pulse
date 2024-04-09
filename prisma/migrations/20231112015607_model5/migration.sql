/*
  Warnings:

  - Added the required column `amigoID` to the `Amizade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `amizade` ADD COLUMN `amigoID` INTEGER NOT NULL;
