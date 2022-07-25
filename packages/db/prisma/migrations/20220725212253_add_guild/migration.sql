/*
  Warnings:

  - Added the required column `guildId` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactions` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "guildId" TEXT NOT NULL,
ADD COLUMN     "reactions" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatarUrl" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "guild" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,

    CONSTRAINT "guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guild_id_key" ON "guild"("id");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
