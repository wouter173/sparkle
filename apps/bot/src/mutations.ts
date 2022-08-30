import { PrismaClient } from "db";
import { Message } from "discord.js";

export const setMessage = async (
  prisma: PrismaClient,
  message: Message,
  reactionCount: number,
  attachments: string
) => {
  const res = await prisma.message.findUnique({
    where: {
      id: message.id,
    },
  });

  if (res == null) return createMessage(prisma, message, reactionCount, attachments);

  return prisma.message.update({
    where: {
      id: message.id,
    },
    data: {
      reactions: reactionCount,
    },
  });
};

export const createMessage = async (
  prisma: PrismaClient,
  message: Message,
  reactionCount: number,
  attachments: string
) => {
  const { author, guild } = message;
  if (guild == null) throw new Error("message not guild message");

  return await prisma.message.create({
    data: {
      id: message.id,
      message: message.content || "",
      createdAt: message.createdAt,
      reactions: reactionCount,
      attachments: attachments,
      author: {
        connectOrCreate: {
          where: {
            id: author.id,
          },
          create: {
            id: author.id,
            name: author.username,
            discriminator: author.discriminator,
            createdAt: author.createdAt,
            avatar: author.avatarURL() || "",
          },
        },
      },
      guild: {
        connectOrCreate: {
          where: {
            id: guild.id,
          },
          create: {
            id: guild.id,
            name: guild.name,
            thumbnail: guild.icon || "",
          },
        },
      },
    },
    include: {
      author: true,
      guild: true,
    },
  });
};
