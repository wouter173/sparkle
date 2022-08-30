import { TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { APIUser } from "discord-api-types/v10";
import { prisma } from "../prisma";
import { getUserWithAccounts } from "../queries";
import { createProtectedRouter } from "./protected-router";

export const appRouter = createProtectedRouter()
  .transformer(superjson)
  .query("guilds", {
    async resolve({ ctx }) {
      const user = await getUserWithAccounts(ctx.session.user.id!);
      if (user == null) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prisma cannot find user" });

      const guilds = await prisma.guild.findMany({
        where: {
          messages: {
            some: {
              authorId: user.discordId,
            },
          },
        },
      });

      await prisma.$disconnect();

      return guilds;
    },
  })
  .query("messages", {
    async resolve({ ctx }) {
      const user = await getUserWithAccounts(ctx.session.user.id!);
      if (user == null) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prisma cannot find user" });

      const messages = await prisma.message.findMany({
        where: {
          authorId: user.discordId,
          AND: {
            reactions: {
              gt: 0,
            },
          },
        },
      });

      await prisma.$disconnect();

      return messages;
    },
  })
  .query("guildMessages", {
    input: z.object({
      guildId: z.string(),
    }),

    async resolve({ ctx, input }) {
      const user = await getUserWithAccounts(ctx.session.user.id!);
      if (user == null) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prisma cannot find user" });

      const messages = await prisma.message.findMany({
        where: {
          guildId: input.guildId,
          reactions: {
            gt: 0,
          },
        },
        include: {
          author: true,
          guild: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      await prisma.$disconnect();

      return messages;
    },
  })
  .query("guild", {
    input: z.object({
      guildId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const guild = await prisma.guild.findFirst({
        where: {
          id: input.guildId,
        },
      });

      return guild;
    },
  })
  .query("avatarUrl", {
    input: z.object({
      userId: z.string(),
    }),

    async resolve({ input: { userId } }) {
      // const data = await fetch("https://discordapp.com/api/v9/users/" + userId, {
      //   headers: {
      //     Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      //   },
      // });

      // const user: APIUser = await data.json();
      // return user.avatar;

      const user = await prisma.discordUser.findUnique({
        where: {
          id: userId,
        },
        select: {
          avatar: true,
        },
      });

      if (user == null) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prisma cannot find user" });
      return user.avatar;
    },
  });

export type AppRouter = typeof appRouter;
