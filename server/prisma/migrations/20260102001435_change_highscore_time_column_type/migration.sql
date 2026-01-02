/*
  Warnings:

  - Changed the type of `time` on the `highscore` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "highscore" DROP COLUMN "time",
ADD COLUMN     "time" BIGINT NOT NULL;
