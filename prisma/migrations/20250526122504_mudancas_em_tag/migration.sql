/*
  Warnings:

  - You are about to drop the column `description` on the `tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tag` DROP COLUMN `description`;

-- CreateIndex
CREATE UNIQUE INDEX `tag_nome_key` ON `tag`(`nome`);
