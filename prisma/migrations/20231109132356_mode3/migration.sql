/*
  Warnings:

  - The required column `chaveConversa` was added to the `Conversa` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `conversa` DROP FOREIGN KEY `Conversa_usuarioUserID_fkey`;

-- DropForeignKey
ALTER TABLE `mensagem` DROP FOREIGN KEY `Mensagem_conversaConversaID_fkey`;

-- AlterTable
ALTER TABLE `conversa` ADD COLUMN `chaveConversa` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Conversa` ADD CONSTRAINT `Conversa_usuarioUserID_fkey` FOREIGN KEY (`usuarioUserID`) REFERENCES `Usuario`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_conversaConversaID_fkey` FOREIGN KEY (`conversaConversaID`) REFERENCES `Conversa`(`conversaID`) ON DELETE CASCADE ON UPDATE CASCADE;
