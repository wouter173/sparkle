import { TRPCError } from "@trpc/server";
import superjson from "superjson";
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

      prisma.$disconnect();

      return guilds;
    },
  })
  .query("messages", {
    async resolve({ ctx }) {
      const user = await prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          accounts: true,
        },
      });

      const messages = await prisma.message.findMany({
        where: {
          authorId: user?.accounts[0]?.providerAccountId,
          AND: {
            reactions: {
              gt: 0,
            },
          },
        },
      });

      prisma.$disconnect();

      return messages;
    },
  });

export type AppRouter = typeof appRouter;
