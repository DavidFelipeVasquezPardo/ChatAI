/*
  Warnings:

  - A unique constraint covering the columns `[idUsuario]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `condicionesvivienda` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `credencial` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `educacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `informacionPersonal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `salud` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `situacionlaboral` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `chats_idUsuario_key` ON `chats`(`idUsuario`);

-- CreateIndex
CREATE UNIQUE INDEX `condicionesvivienda_idUsuario_key` ON `condicionesvivienda`(`idUsuario`);

-- CreateIndex
CREATE UNIQUE INDEX `credencial_idUsuario_key` ON `credencial`(`idUsuario`);

-- CreateIndex
CREATE UNIQUE INDEX `educacion_idUsuario_key` ON `educacion`(`idUsuario`);

-- CreateIndex
CREATE UNIQUE INDEX `informacionPersonal_idUsuario_key` ON `informacionPersonal`(`idUsuario`);

-- CreateIndex
CREATE UNIQUE INDEX `salud_idUsuario_key` ON `salud`(`idUsuario`);

-- CreateIndex
CREATE UNIQUE INDEX `situacionlaboral_idUsuario_key` ON `situacionlaboral`(`idUsuario`);
