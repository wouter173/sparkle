import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "db";
import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import { env } from "../../../env/server.mjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify guilds",
        },
      },
      profile(profile: DiscordProfile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        console.log(profile);

        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image_url,
          huts: "yup",
        };
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
