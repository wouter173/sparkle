import { Client, ClientOptions, Partials } from "discord.js";
import { PrismaClient } from "db";
import dotenv from "dotenv";
import { setMessage } from "./mutations";
import { trigger, emoji } from "../config.json";
dotenv.config({ path: "../../.env" });

const prisma = new PrismaClient();

const intents: ClientOptions["intents"] = [
  "GuildMessageReactions",
  "GuildMessages",
  "MessageContent",
  "Guilds",
];

const client = new Client({
  intents,
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot || !msg.content.includes(trigger)) return;
  if (msg.content.includes("ping")) {
    msg.channel.send("pong");
  }
});

client.on("messageReactionAdd", async (payload) => {
  if (payload.partial) payload = await payload.fetch();
  if (payload.emoji.name != emoji) return;

  let message = payload.message;
  if (message.partial) message = await message.fetch();

  const reactionCount = message.reactions.cache.get(emoji)?.count ?? 0;

  setMessage(prisma, message, reactionCount);
});

client.on("messageReactionRemove", async (payload) => {
  if (payload.partial) payload = await payload.fetch();
  if (payload.emoji.name != emoji) return;

  let message = payload.message;
  if (message.partial) message = await message.fetch();

  const reactionCount = message.reactions.cache.get(emoji)?.count ?? 0;

  setMessage(prisma, message, reactionCount);
});

client.on("ready", () => console.log("ready"));
client.login(process.env.BOT_TOKEN);
