/*
  Warnings:

  - You are about to drop the `likedMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "likedMessage";

-- CreateTable
CREATE TABLE "message" (
    "id" INTEGER NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "message_id_key" ON "message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
