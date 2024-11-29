/*
  Warnings:

  - You are about to alter the column `ingresos` on the `situacionlaboral` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `situacionlaboral` MODIFY `ingresos` VARCHAR(191) NOT NULL;
