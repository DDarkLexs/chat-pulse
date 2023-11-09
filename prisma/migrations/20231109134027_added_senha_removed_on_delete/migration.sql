/*
  Warnings:

  - Made the column `usuarioUserID` on table `conversa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `conversaConversaID` on table `mensagem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `conversa` DROP FOREIGN KEY `Conversa_usuarioUserID_fkey`;

-- DropForeignKey
ALTER TABLE `mensagem` DROP FOREIGN KEY `Mensagem_conversaConversaID_fkey`;

-- AlterTable
ALTER TABLE `conversa` MODIFY `usuarioUserID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mensagem` MODIFY `conversaConversaID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `senha` VARCHAR(100) NOT NULL DEFAULT '1234';

-- AddForeignKey
ALTER TABLE `Conversa` ADD CONSTRAINT `Conversa_usuarioUserID_fkey` FOREIGN KEY (`usuarioUserID`) REFERENCES `Usuario`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_conversaConversaID_fkey` FOREIGN KEY (`conversaConversaID`) REFERENCES `Conversa`(`conversaID`) ON DELETE RESTRICT ON UPDATE CASCADE;
