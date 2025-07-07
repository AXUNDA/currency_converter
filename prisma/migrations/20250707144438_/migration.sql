/*
  Warnings:

  - You are about to drop the column `newtAmount` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `netAmount` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quote` DROP COLUMN `newtAmount`,
    ADD COLUMN `netAmount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
