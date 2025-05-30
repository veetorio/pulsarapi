/*
  Warnings:

  - Added the required column `urlImage` to the `noticia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `noticia` ADD COLUMN `urlImage` LONGTEXT NOT NULL;
