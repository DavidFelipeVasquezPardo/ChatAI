-- CreateTable
CREATE TABLE `informacion_usuario` (
    `idUsuario` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefonoPersonal` VARCHAR(191) NOT NULL,
    `telefonoFamiliar` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `informacion_usuario_idUsuario_key`(`idUsuario`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credencial` (
    `idCredencial` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `credencial_idCredencial_key`(`idCredencial`),
    PRIMARY KEY (`idCredencial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `credencial` ADD CONSTRAINT `credencial_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
