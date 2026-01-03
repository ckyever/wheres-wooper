/*
  Warnings:

  - You are about to alter the column `username` on the `highscore` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(20)`.

*/
-- AlterTable
ALTER TABLE "highscore" ALTER COLUMN "username" SET DATA TYPE CHAR(20);
