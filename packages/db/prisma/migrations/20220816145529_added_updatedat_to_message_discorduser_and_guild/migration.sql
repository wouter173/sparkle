/*
  Warnings:

  - Added the required column `updatedAt` to the `discord_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discord_user" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "guild" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
