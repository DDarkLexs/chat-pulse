-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `bio` VARCHAR(191) NOT NULL DEFAULT 'dispónivel',
    MODIFY `senha` VARCHAR(191) NOT NULL DEFAULT '1234567';
