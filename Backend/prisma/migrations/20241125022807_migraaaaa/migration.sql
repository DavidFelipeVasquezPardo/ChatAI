/*
  Warnings:

  - You are about to alter the column `matedificulta` on the `educacion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `educacion` MODIFY `matedificulta` JSON NOT NULL;
