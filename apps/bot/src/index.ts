import { Client, Partials } from "discord.js";
import { PrismaClient } from "db";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const prisma = new PrismaClient();

const trigger = "?!";
const emoji = "✨";

const client = new Client({
  intents: [
    "GuildMessageReactions",
    "GuildMessages",
    "MessageContent",
    "Guilds",
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot || !msg.content.includes(trigger)) return;
  if (msg.content.includes("ping")) {
    msg.channel.send("pong");
  }
});

client.on("messageReactionAdd", async (payload) => {
  if (payload.partial) await payload.fetch();
  if (payload.emoji.name != emoji) return;

  const author = payload.message.author!;
  const guild = payload.message.guild!;
  const reactionCount = payload.message.reactions.cache.get(emoji)!.count;

  await prisma.message.create({
    data: {
      id: payload.message.id,
      message: payload.message.content || "",
      createdAt: payload.message.createdAt,
      reactions: reactionCount,
      author: {
        connectOrCreate: {
          where: {
            id: author.id,
          },
          create: {
            id: author.id,
            name: author.username,
            createdAt: author.createdAt,
            avatarUrl: author.avatarURL() || "",
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
            thumbnail: guild.iconURL() || "",
          },
        },
      },
    },
    include: {
      author: true,
      guild: true,
    },
  });
});

client.on("messageReactionRemove", async (payload) => {});

client.on("ready", () => console.log("ready"));
client.login(process.env.BOT_TOKEN);
