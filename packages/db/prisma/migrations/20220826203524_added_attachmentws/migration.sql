/*
  Warnings:

  - Added the required column `attachments` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN "attachments" TEXT;
UPDATE "message" SET "attachments" = '{}';
ALTER TABLE "message" ALTER COLUMN "attachments" SET NOT NULL;
