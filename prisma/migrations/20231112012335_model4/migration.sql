/*
  Warnings:

  - You are about to drop the column `usuarioUserID` on the `conversa` table. All the data in the column will be lost.
  - You are about to drop the column `conversaConversaID` on the `mensagem` table. All the data in the column will be lost.
  - Added the required column `conversaID` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conversa` DROP FOREIGN KEY `Conversa_usuarioUserID_fkey`;

-- DropForeignKey
ALTER TABLE `mensagem` DROP FOREIGN KEY `Mensagem_conversaConversaID_fkey`;

-- AlterTable
ALTER TABLE `conversa` DROP COLUMN `usuarioUserID`,
    ADD COLUMN `amizadeID` INTEGER NULL;

-- AlterTable
ALTER TABLE `mensagem` DROP COLUMN `conversaConversaID`,
    ADD COLUMN `conversaID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `senha` VARCHAR(191) NOT NULL DEFAULT '123467';

-- CreateTable
CREATE TABLE `Amizade` (
    `amizadeID` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioID` INTEGER NULL,

    PRIMARY KEY (`amizadeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Amizade` ADD CONSTRAINT `Amizade_usuarioID_fkey` FOREIGN KEY (`usuarioID`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversa` ADD CONSTRAINT `Conversa_amizadeID_fkey` FOREIGN KEY (`amizadeID`) REFERENCES `Amizade`(`amizadeID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_conversaID_fkey` FOREIGN KEY (`conversaID`) REFERENCES `Conversa`(`conversaID`) ON DELETE RESTRICT ON UPDATE CASCADE;
