/*
  Warnings:

  - Added the required column `meme_url` to the `memes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `memes` ADD COLUMN `meme_url` VARCHAR(191) NOT NULL;
