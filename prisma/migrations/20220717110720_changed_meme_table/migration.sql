/*
  Warnings:

  - You are about to drop the column `userId` on the `memes` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `memes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `memes` DROP FOREIGN KEY `memes_userId_fkey`;

-- AlterTable
ALTER TABLE `memes` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `memes` ADD CONSTRAINT `memes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
