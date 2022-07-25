/*
  Warnings:

  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_authorId_fkey";

-- AlterTable
ALTER TABLE "message" DROP CONSTRAINT "message_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
