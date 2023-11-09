/*
  Warnings:

  - The primary key for the `mensagem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `MensagemID` on the `mensagem` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `mensagem` table. All the data in the column will be lost.
  - Added the required column `mensagemID` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mensagem` DROP FOREIGN KEY `Mensagem_user_fkey`;

-- AlterTable
ALTER TABLE `mensagem` DROP PRIMARY KEY,
    DROP COLUMN `MensagemID`,
    DROP COLUMN `user`,
    ADD COLUMN `conversaConversaID` INTEGER NULL,
    ADD COLUMN `mensagemID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`mensagemID`);

-- CreateTable
CREATE TABLE `Conversa` (
    `conversaID` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,
    `usuarioUserID` INTEGER NULL,

    PRIMARY KEY (`conversaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conversa` ADD CONSTRAINT `Conversa_usuarioUserID_fkey` FOREIGN KEY (`usuarioUserID`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_conversaConversaID_fkey` FOREIGN KEY (`conversaConversaID`) REFERENCES `Conversa`(`conversaID`) ON DELETE SET NULL ON UPDATE CASCADE;
