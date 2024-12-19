/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `informacion_usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefonoPersonal]` on the table `informacion_usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documento]` on the table `informacion_usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documento` to the `informacion_usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `informacionPersonal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `informacion_usuario` ADD COLUMN `disponibilidad` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `documento` VARCHAR(191) NOT NULL,
    ADD COLUMN `testActual` VARCHAR(191) NULL,
    ADD COLUMN `tipoDocumento` VARCHAR(191) NOT NULL DEFAULT 'CC';

-- AlterTable
ALTER TABLE `informacionpersonal` ADD COLUMN `sexo` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ghq12` (
    `idGhq12` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `tratDatos` VARCHAR(191) NOT NULL DEFAULT '',
    `historial` JSON NULL,
    `Puntaje` INTEGER NOT NULL DEFAULT 0,
    `preguntaActual` INTEGER NOT NULL DEFAULT 0,
    `resPreg` JSON NULL,

    UNIQUE INDEX `ghq12_idGhq12_key`(`idGhq12`),
    UNIQUE INDEX `ghq12_telefono_key`(`telefono`),
    PRIMARY KEY (`idGhq12`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tests` (
    `idTests` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `tratDatos` VARCHAR(191) NOT NULL DEFAULT '',
    `historial` JSON NULL,
    `Puntaje` INTEGER NOT NULL DEFAULT 0,
    `preguntaActual` INTEGER NOT NULL DEFAULT 0,
    `resPreg` JSON NULL,

    UNIQUE INDEX `tests_idTests_key`(`idTests`),
    UNIQUE INDEX `tests_telefono_key`(`telefono`),
    PRIMARY KEY (`idTests`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultorio` (
    `idConsultorio` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `consultorio_idConsultorio_key`(`idConsultorio`),
    PRIMARY KEY (`idConsultorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historialAgendamiento` (
    `idHistAgendamiento` VARCHAR(191) NOT NULL,
    `numeroUsuario` VARCHAR(191) NOT NULL,
    `citaAgendada` BOOLEAN NOT NULL DEFAULT false,
    `tratDatos` VARCHAR(191) NOT NULL DEFAULT '',
    `historial` JSON NULL,
    `agendamiento` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `historialAgendamiento_idHistAgendamiento_key`(`idHistAgendamiento`),
    UNIQUE INDEX `historialAgendamiento_numeroUsuario_key`(`numeroUsuario`),
    PRIMARY KEY (`idHistAgendamiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practicante` (
    `idPracticante` VARCHAR(191) NOT NULL,
    `numero_documento` VARCHAR(191) NOT NULL,
    `tipo_documento` VARCHAR(191) NOT NULL DEFAULT 'CC',
    `nombre` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `estrato` VARCHAR(191) NOT NULL,
    `barrio` VARCHAR(191) NOT NULL,
    `localidad` VARCHAR(191) NOT NULL,
    `horario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `practicante_idPracticante_key`(`idPracticante`),
    UNIQUE INDEX `practicante_numero_documento_key`(`numero_documento`),
    PRIMARY KEY (`idPracticante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cita` (
    `idCita` VARCHAR(191) NOT NULL,
    `idConsultorio` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `idPracticante` VARCHAR(191) NOT NULL,
    `fechaHora` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cita_idCita_key`(`idCita`),
    PRIMARY KEY (`idCita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `informacion_usuario_correo_key` ON `informacion_usuario`(`correo`);

-- CreateIndex
CREATE UNIQUE INDEX `informacion_usuario_telefonoPersonal_key` ON `informacion_usuario`(`telefonoPersonal`);

-- CreateIndex
CREATE UNIQUE INDEX `informacion_usuario_documento_key` ON `informacion_usuario`(`documento`);

-- AddForeignKey
ALTER TABLE `chats` ADD CONSTRAINT `chats_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ghq12` ADD CONSTRAINT `ghq12_telefono_fkey` FOREIGN KEY (`telefono`) REFERENCES `informacion_usuario`(`telefonoPersonal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tests` ADD CONSTRAINT `tests_telefono_fkey` FOREIGN KEY (`telefono`) REFERENCES `informacion_usuario`(`telefonoPersonal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historialAgendamiento` ADD CONSTRAINT `historialAgendamiento_numeroUsuario_fkey` FOREIGN KEY (`numeroUsuario`) REFERENCES `informacion_usuario`(`telefonoPersonal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cita` ADD CONSTRAINT `cita_idConsultorio_fkey` FOREIGN KEY (`idConsultorio`) REFERENCES `consultorio`(`idConsultorio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cita` ADD CONSTRAINT `cita_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cita` ADD CONSTRAINT `cita_idPracticante_fkey` FOREIGN KEY (`idPracticante`) REFERENCES `practicante`(`idPracticante`) ON DELETE RESTRICT ON UPDATE CASCADE;
