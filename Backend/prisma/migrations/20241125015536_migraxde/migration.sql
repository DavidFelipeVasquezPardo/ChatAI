/*
  Warnings:

  - You are about to alter the column `servicios` on the `condicionesvivienda` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `problemas` on the `condicionesvivienda` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `condicionesvivienda` MODIFY `servicios` JSON NOT NULL,
    MODIFY `problemas` JSON NOT NULL;
