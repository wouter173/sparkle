/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `discord_user` table. All the data in the column will be lost.
  - You are about to drop the `avatar` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatar` to the `discord_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "avatar" DROP CONSTRAINT "avatar_userId_fkey";

-- AlterTable
ALTER TABLE "discord_user" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "avatar";
