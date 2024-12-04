-- CreateTable
CREATE TABLE `chats` (
    `idchat` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `conversacion` JSON NOT NULL,

    UNIQUE INDEX `chats_idchat_key`(`idchat`),
    PRIMARY KEY (`idchat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
