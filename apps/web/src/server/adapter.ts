import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

const adapter = PrismaAdapter(prisma);
adapter.createUser = async (data) => {
  const { discordId, username, email, image_url, discriminator } = data as {
    discordId: string;
    username: string;
    email: string;
    image_url: string;
    discriminator: string;
  };

  return await prisma.user.create({
    data: {
      email,

      discordUser: {
        connectOrCreate: {
          where: {
            id: discordId,
          },
          create: {
            id: discordId,
            name: username,
            avatar: image_url,
            discriminator,
          },
        },
      },
    },
  });
};

export default adapter;
