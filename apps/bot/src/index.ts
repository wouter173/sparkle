import "dotenv/config";
import {
  Attachment,
  Client,
  ClientOptions,
  MessageMentions,
  MessageReaction,
  PartialMessageReaction,
  Partials,
} from "discord.js";
import { PrismaClient } from "db";
import { setMessage } from "./mutations";
import { trigger, emoji } from "../config.json";

const prisma = new PrismaClient();

const intents: ClientOptions["intents"] = [
  "GuildMessageReactions",
  "GuildMessages",
  "MessageContent",
  "Guilds",
  "GuildMembers",
  "GuildPresences",
];

const client = new Client({
  intents,
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

const hydrateMessageMentions = (content: string, mentions: MessageMentions) => {
  for (const user of mentions.users.values()) {
    content = content.replaceAll(`<@${user.id}>`, `<@${user.username}>`);
  }

  for (const role of mentions.roles.values()) {
    content = content.replaceAll(`<@&${role.id}>`, `<@&${role.name}>`);
  }

  for (const channel of mentions.channels.values()) {
    const filler = channel.isDMBased() ? "deleted-channel" : channel.name;
    content = content.replaceAll(`<#${channel.id}>`, `<#${filler}>`);
  }

  content = content.replaceAll("@everyone", "<!@everyone>");
  content = content.replaceAll("@here", "<!@here>");

  return content;
};

client.on("messageUpdate", async (_oldMsg, newMsg) => {
  const msg = newMsg.partial ? await newMsg.fetch() : newMsg;

  const messageExists = !!(await prisma.message.findFirst({ where: { id: newMsg.id } }));
  if (!messageExists) return;

  const content = hydrateMessageMentions(msg.content, msg.mentions);
  setMessage(prisma, msg, content, newMsg.reactions.cache.get(emoji)?.count ?? 0, "");
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot || !msg.content.includes(trigger)) return;
  if (msg.content.includes("ping")) {
    msg.channel.send("pong");
  }
});

client.on("guildUpdate", async (oldGuild, newGuild) => {
  const guild = await prisma.guild.findUnique({
    where: {
      id: oldGuild.id,
    },
  });

  if (guild == null) return;

  await prisma.guild.update({
    where: {
      id: oldGuild.id,
    },
    data: {
      name: newGuild.name,
      thumbnail: newGuild.icon || "",
    },
  });

  console.log("guild update, id:" + guild.id);
});

client.on("userUpdate", async (oldUser, newUser) => {
  const user = await prisma.discordUser.findUnique({
    where: {
      id: oldUser.id,
    },
  });

  if (user == null) return;
  await prisma.discordUser.update({
    where: {
      id: oldUser.id,
    },
    data: {
      name: newUser.username,
      avatar: newUser.avatar || "",
      discriminator: newUser.discriminator,
    },
  });

  console.log("user update, id:" + user.id);
});

const updateReaction = async (payload: MessageReaction | PartialMessageReaction) => {
  if (payload.partial) payload = await payload.fetch();
  if (payload.emoji.name != emoji) return;

  let message = payload.message;
  if (message.partial) message = await message.fetch();

  type partialAttachment = Omit<Attachment, "attachment" | "name"> & {
    filename: string | null;
    attachment?: string;
    name?: string;
  };

  const attachments = message.attachments.map((attachment) => {
    return {
      id: attachment.id,
      filename: attachment.name,
      description: attachment.description,
      contentType: attachment.contentType,
      height: attachment.height,
      width: attachment.width,
      size: attachment.size,
      url: attachment.url,
      proxyUrl: attachment.proxyURL,
      ephemeral: attachment.ephemeral,
      spoiler: attachment.spoiler,
    };
  });

  const content = hydrateMessageMentions(message.content, message.mentions);
  const attachmentsString = JSON.stringify(attachments);
  const reactionCount = message.reactions.cache.get(emoji)?.count ?? 0;

  setMessage(prisma, message, content, reactionCount, attachmentsString);
};

client.on("messageReactionAdd", updateReaction);
client.on("messageReactionRemove", updateReaction);

client.on("ready", () => console.log("ready"));
client.login(process.env.BOT_TOKEN);
