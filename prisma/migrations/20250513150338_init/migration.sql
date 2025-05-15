-- CreateTable
CREATE TABLE `Usuario` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,
    `senha` TEXT NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
