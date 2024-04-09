/*
  Warnings:

  - You are about to drop the column `usuarioUserID` on the `chatroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_usuarioUserID_fkey`;

-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `usuarioUserID`,
    ADD COLUMN `usuarioUserID1` INTEGER NULL,
    ADD COLUMN `usuarioUserID2` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_usuarioUserID1_fkey` FOREIGN KEY (`usuarioUserID1`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_usuarioUserID2_fkey` FOREIGN KEY (`usuarioUserID2`) REFERENCES `Usuario`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
