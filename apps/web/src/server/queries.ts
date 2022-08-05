import { prisma } from "./prisma";

export const getUser = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      accounts: true,
      sessions: true,
    },
  });

  return user;
};
