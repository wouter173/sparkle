-- CreateTable
CREATE TABLE "likedMessage" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likedMessage_pkey" PRIMARY KEY ("id")
);
