/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `author` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_authorId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image";

-- DropTable
DROP TABLE "author";

-- CreateTable
CREATE TABLE "discord_user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatarUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "discord_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "nonce" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "discord_user_id_key" ON "discord_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "avatar_userId_key" ON "avatar"("userId");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "discord_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "discord_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "discord_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
