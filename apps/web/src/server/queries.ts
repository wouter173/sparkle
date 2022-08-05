import { prisma } from "./prisma";

export const getUserWithAccounts = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      accounts: true,
    },
  });
};

export const getUser = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};
