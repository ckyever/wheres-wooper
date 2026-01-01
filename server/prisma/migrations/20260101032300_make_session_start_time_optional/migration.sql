-- AlterTable
ALTER TABLE "session" ALTER COLUMN "start_time" DROP NOT NULL,
ALTER COLUMN "start_time" DROP DEFAULT;
