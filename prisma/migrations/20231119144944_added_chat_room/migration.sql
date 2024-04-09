/*
  Warnings:

  - You are about to drop the column `chatKey` on the `amizade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `amizade` DROP COLUMN `chatKey`;

-- CreateTable
CREATE TABLE `ChatRoom` (
    `ChatRoomID` INTEGER NOT NULL AUTO_INCREMENT,
    `chatKey` VARCHAR(191) NOT NULL,
    `usuarioUserID` INTEGER NULL,

    PRIMARY KEY (`ChatRoomID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_usuarioUserID_fkey` FOREIGN KEY (`usuarioUserID`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
