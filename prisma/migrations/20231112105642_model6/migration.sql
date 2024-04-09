/*
  Warnings:

  - Made the column `usuarioID` on table `amizade` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `amizade` DROP FOREIGN KEY `Amizade_usuarioID_fkey`;

-- AlterTable
ALTER TABLE `amizade` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `usuarioID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mensagem` ADD COLUMN `userID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Amizade` ADD CONSTRAINT `Amizade_usuarioID_fkey` FOREIGN KEY (`usuarioID`) REFERENCES `Usuario`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
