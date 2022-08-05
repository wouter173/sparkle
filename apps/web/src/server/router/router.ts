import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import { getUser } from "../queries";
import { createProtectedRouter } from "./protected-router";

export const protectedExampleRouter = createProtectedRouter()
  .query("getDiscordId", {
    async resolve({ ctx }) {
      const user = await getUser(ctx.session.user.id!);
      if (user == null) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Prisma cannot find user" });
      return user.id;
    },
  })
  .query("getMessages", {
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

      return messages;
    },
  });
