-- CreateTable
CREATE TABLE `informacionPersonal` (
    `idinformacionPersonal` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `edad` INTEGER NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `estadocivil` VARCHAR(191) NOT NULL,
    `hijosnum` INTEGER NOT NULL,
    `personascargo` INTEGER NOT NULL,
    `vivienda` VARCHAR(191) NOT NULL,
    `localidad` VARCHAR(191) NOT NULL,
    `tipovivienda` VARCHAR(191) NOT NULL,
    `familiaresnum` INTEGER NOT NULL,
    `estrato` INTEGER NOT NULL,
    `etnico` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `informacionPersonal_idinformacionPersonal_key`(`idinformacionPersonal`),
    PRIMARY KEY (`idinformacionPersonal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `condicionesvivienda` (
    `idcondicionesvivienda` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `hacinamiento` VARCHAR(191) NOT NULL,
    `violencia` VARCHAR(191) NOT NULL,
    `servicios` VARCHAR(191) NOT NULL,
    `problemas` VARCHAR(191) NOT NULL,
    `tipozona` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `condicionesvivienda_idcondicionesvivienda_key`(`idcondicionesvivienda`),
    PRIMARY KEY (`idcondicionesvivienda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `educacion` (
    `ideducacion` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `tipocolegio` VARCHAR(191) NOT NULL,
    `nivelescolaridad` VARCHAR(191) NOT NULL,
    `carrera` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `matedificulta` VARCHAR(191) NOT NULL,
    `nivelingles` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `educacion_ideducacion_key`(`ideducacion`),
    PRIMARY KEY (`ideducacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `situacionlaboral` (
    `idsituacionlaboral` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `situacion` VARCHAR(191) NOT NULL,
    `ingresos` DOUBLE NOT NULL,
    `sector` VARCHAR(191) NOT NULL,
    `jornada` VARCHAR(191) NOT NULL,
    `ascenso` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `situacionlaboral_idsituacionlaboral_key`(`idsituacionlaboral`),
    PRIMARY KEY (`idsituacionlaboral`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salud` (
    `idsalud` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `enfermecronica` VARCHAR(191) NOT NULL,
    `discapacidad` VARCHAR(191) NOT NULL,
    `suspsicoactivas` VARCHAR(191) NOT NULL,
    `alcohol` VARCHAR(191) NOT NULL,
    `internet` VARCHAR(191) NOT NULL,
    `nicotina` VARCHAR(191) NOT NULL,
    `eps` VARCHAR(191) NOT NULL,
    `asispsicologo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `salud_idsalud_key`(`idsalud`),
    PRIMARY KEY (`idsalud`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `informacionPersonal` ADD CONSTRAINT `informacionPersonal_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `condicionesvivienda` ADD CONSTRAINT `condicionesvivienda_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `educacion` ADD CONSTRAINT `educacion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `situacionlaboral` ADD CONSTRAINT `situacionlaboral_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salud` ADD CONSTRAINT `salud_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `informacion_usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
