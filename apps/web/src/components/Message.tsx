import { DiscordUser, Guild, Message as MessageType } from "db";
import { APIAttachment } from "discord-api-types/v10";
import { FC } from "react";
import Avatar from "./Avatar";

const constructMessageElements = (message: string, id: string) => {
  const splitRegex = /\\?(<a?:\w+:\d+>|<[#@]&?\w+>)/;

  const elements = message.split(splitRegex).map((part, i) => {
    const matches = part.match(/(<a?:(?<emojiName>\w+):(?<emojiId>\d+)>|<[#@]&?(?<mentionName>\w+)>)/);

    if (matches) {
      const { emojiName, emojiId, mentionName } = matches.groups!;

      if (emojiName && emojiId) return <Emoji key={emojiName + id + i} name={emojiName} id={emojiId} />;
      if (mentionName) return <Mention key={mentionName + id + i} name={mentionName} />;
    }

    return part;
  });

  if (elements.length == 1 && elements[0] === "") return [];
  return elements;
};

export const Message: FC<{ msg: MessageType & { guild: Guild; author: DiscordUser } }> = ({ msg }) => {
  const contentElements = constructMessageElements(msg.message, msg.id);

  const attachments = JSON.parse(msg.attachments) as APIAttachment[];

  return (
    <article className="flex w-full flex-row">
      <Avatar avatarId={msg.author.avatar} userId={msg.author.id} className="mr-2 h-12 rounded-full" />
      <div className="flex flex-col gap-2">
        {contentElements.length > 0 ? (
          <div className="w-fit rounded-xl border border-main bg-black p-2 px-3">{contentElements}</div>
        ) : null}

        {attachments.length > 0 ? (
          <ul className="flex w-full flex-col gap-2">
            {attachments.map((attachment) => (
              <li key={attachment.id} className="w-full overflow-hidden  rounded-xl border border-main bg-black">
                <img src={attachment.url} alt={attachment.description} />
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="flex flex-row">
          <li className="rounded-lg border border-main bg-black px-2 py-1 text-sm">✨{msg.reactions}</li>
        </ul>
      </div>
    </article>
  );
};

const Emoji: FC<{ name: string; id: string }> = ({ name, id }) => {
  const url = `https://cdn.discordapp.com/emojis/${id}.webp?size=56&quality=lossless`;
  return <img className="inline-block h-5" src={url} alt={name} />;
};

const Mention: FC<{ name: string }> = ({ name }) => {
  return <span className="rounded-sm bg-[#5865f2] bg-opacity-80 p-0.5 px-1 text-white">{name}</span>;
};
