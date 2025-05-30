-- CreateTable
CREATE TABLE `noticia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(40) NOT NULL,
    `descricao` TEXT NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioFk` INTEGER NULL,

    INDEX `Noticia_usuarioFk_fkey`(`usuarioFk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nomeReal` VARCHAR(50) NOT NULL,
    `nomeProtoTipo` VARCHAR(30) NOT NULL,
    `descricao` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lancamento` DATETIME(3) NOT NULL,
    `usuarioFk` INTEGER NOT NULL,

    INDEX `Produto_usuarioFk_fkey`(`usuarioFk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,
    `senha` TEXT NOT NULL,
    `atividade` BOOLEAN NOT NULL DEFAULT true,
    `salt` VARCHAR(191) NOT NULL,
    `tipo_usuario` ENUM('COMMON', 'ADMIN') NOT NULL DEFAULT 'COMMON',

    UNIQUE INDEX `usuario_salt_key`(`salt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_produtototag` (
    `A` BIGINT NOT NULL,
    `B` INTEGER NOT NULL,

    INDEX `_produtototag_B_index`(`B`),
    UNIQUE INDEX `_produtototag_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_noticiatotag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_noticiatotag_AB_unique`(`A`, `B`),
    INDEX `_noticiatotag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `Produto_usuarioFk_fkey` FOREIGN KEY (`usuarioFk`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_produtototag` ADD CONSTRAINT `_ProdutoToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_noticiatotag` ADD CONSTRAINT `_noticiatotag_A_fkey` FOREIGN KEY (`A`) REFERENCES `noticia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_noticiatotag` ADD CONSTRAINT `_noticiatotag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
