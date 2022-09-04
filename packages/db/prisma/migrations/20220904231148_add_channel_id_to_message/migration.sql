/*
  Warnings:

  - Added the required column `channelId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN "channelId" TEXT;
UPDATE "message" SET "channelId" = '';
ALTER TABLE "message" ALTER COLUMN "attachments" SET NOT NULL;
