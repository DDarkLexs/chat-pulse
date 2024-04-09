/*
  Warnings:

  - You are about to drop the column `amigoID` on the `amizade` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioID` on the `amizade` table. All the data in the column will be lost.
  - You are about to drop the column `conversaID` on the `mensagem` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `mensagem` table. All the data in the column will be lost.
  - You are about to drop the `conversa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userID1` to the `Amizade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID2` to the `Amizade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `amizade` DROP FOREIGN KEY `Amizade_usuarioID_fkey`;

-- DropForeignKey
ALTER TABLE `conversa` DROP FOREIGN KEY `Conversa_amizadeID_fkey`;

-- DropForeignKey
ALTER TABLE `mensagem` DROP FOREIGN KEY `Mensagem_conversaID_fkey`;

-- DropForeignKey
ALTER TABLE `mensagem` DROP FOREIGN KEY `Mensagem_userID_fkey`;

-- AlterTable
ALTER TABLE `amizade` DROP COLUMN `amigoID`,
    DROP COLUMN `usuarioID`,
    ADD COLUMN `userID1` INTEGER NOT NULL,
    ADD COLUMN `userID2` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mensagem` DROP COLUMN `conversaID`,
    DROP COLUMN `userID`,
    ADD COLUMN `destinarioID` INTEGER NULL,
    ADD COLUMN `enviadorID` INTEGER NULL;

-- DropTable
DROP TABLE `conversa`;

-- AddForeignKey
ALTER TABLE `Amizade` ADD CONSTRAINT `Amizade_userID1_fkey` FOREIGN KEY (`userID1`) REFERENCES `Usuario`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Amizade` ADD CONSTRAINT `Amizade_userID2_fkey` FOREIGN KEY (`userID2`) REFERENCES `Usuario`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_enviadorID_fkey` FOREIGN KEY (`enviadorID`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_destinarioID_fkey` FOREIGN KEY (`destinarioID`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
