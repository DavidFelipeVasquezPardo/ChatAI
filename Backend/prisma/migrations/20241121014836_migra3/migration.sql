/*
  Warnings:

  - You are about to drop the column `internet` on the `salud` table. All the data in the column will be lost.
  - Added the required column `Internet` to the `salud` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salud` DROP COLUMN `internet`,
    ADD COLUMN `Internet` VARCHAR(191) NOT NULL;
