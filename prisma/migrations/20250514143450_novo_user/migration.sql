/*
  Warnings:

  - You are about to drop the column `tipo` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `tipo`,
    ADD COLUMN `tipo_usuario` ENUM('COMMON', 'ADMIN') NOT NULL DEFAULT 'COMMON';
