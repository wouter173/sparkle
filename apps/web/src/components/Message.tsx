import { ArrowTopRightOnSquareIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { DiscordUser, Guild, Message as MessageType } from "db";
import { APIAttachment } from "discord-api-types/v10";
import { createContext, FC, useContext, useState } from "react";
import { humanFileSize } from "../utils/filesize";
import Avatar from "./Avatar";

const hoverContext = createContext(false);

const constructMessageElements = (message: string, id: string) => {
  const splitRegex = /(<a?:[^:]+:\d+>|<!?[#@]&?[^>]+>)/;

  const elements = message.split(splitRegex).map((part, i) => {
    const matches = part.match(
      /(<(?<emojiAnimated>a)?:(?<emojiName>[^:]+):(?<emojiId>\d+)>|<!?(?<mentionPrefix>[#@])&?(?<mentionName>[^>]+)>)/
    );

    if (matches) {
      const { emojiAnimated, emojiName, emojiId, mentionName, mentionPrefix } = matches.groups!;

      if (emojiName && emojiId)
        return <Emoji key={id + i} name={emojiName} id={emojiId} animated={emojiAnimated == "a"} />;

      if (mentionName && mentionPrefix) return <Mention key={id + i} prefix={mentionPrefix} name={mentionName} />;
    }

    return part;
  });

  if (elements.length == 1 && elements[0] === "") return [];
  return elements;
};

export const Message: FC<{ msg: MessageType & { guild: Guild; author: DiscordUser } }> = ({ msg }) => {
  const textContentElements = constructMessageElements(msg.message, msg.id);
  const attachments = JSON.parse(msg.attachments) as APIAttachment[];

  const linkUrl = msg.channelId ? `https://discord.com/channels/${msg.guild.id}/${msg.channelId}/${msg.id}` : null;
  const [hover, setHover] = useState(false);

  return (
    <hoverContext.Provider value={hover}>
      <article
        className="flex w-full flex-row"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Avatar avatarId={msg.author.avatar} userId={msg.author.id} className="relative z-20 mr-2 h-12 rounded-full" />
        <div className="relative">
          <div
            className={`${hover ? "opacity-100" : "opacity-0"}
            absolute -top-3 -left-3 z-10 h-[calc(100%+24px)] w-[calc(100%+24px)] rounded-2xl bg-[#1B1B1C] 
          `}
          />
          <div className="relative top-0 z-20 flex flex-col gap-1">
            {textContentElements.length > 0 ? (
              <div className="w-fit rounded-xl border border-main bg-black p-2 px-3">{textContentElements}</div>
            ) : null}

            {attachments.length > 0 ? (
              <ul className="flex w-full flex-col gap-1">
                {attachments.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="w-fit max-w-full overflow-hidden rounded-xl border border-main bg-black"
                  >
                    <Attachment attachment={attachment} />
                  </li>
                ))}
              </ul>
            ) : null}

            <ul className="flex flex-row">
              <li className="rounded-lg border border-main bg-black px-2 py-1 text-sm">???{msg.reactions}</li>
            </ul>

            <div
              className={`${hover ? "opacity-100" : "opacity-0"} 
              flex flex-row items-start text-xs font-semibold text-embossed transition-all
            `}
            >
              {msg.author.name}#{msg.author.discriminator} - {msg.createdAt.toDateString()}
              {linkUrl && (
                <a href={linkUrl} className="ml-0.5 flex items-center" target="_blank" rel="noreferrer">
                  - Link <ArrowTopRightOnSquareIcon className="ml-0.5 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </hoverContext.Provider>
  );
};

const Attachment: FC<{ attachment: APIAttachment }> = ({ attachment }) => {
  const supportedAttachmentTypes = ["image/gif", "image/jpeg", "image/png"];

  //this catches contentType which has been ported to content_type to match the discord API
  const contentType = attachment.content_type || (attachment as APIAttachment & { contentType?: string }).contentType;

  if (supportedAttachmentTypes.includes(contentType || ""))
    return <img src={attachment.url} alt={attachment.description} />;

  return (
    <div className="flex flex-row items-center p-2 px-3">
      <DocumentIcon className="mr-1 h-7 text-darkened" />
      <div>
        <p className="text-sm text-darkened">{attachment.filename || "File"}</p>
        <p className="text-xs text-darkened text-opacity-70">{humanFileSize(attachment.size)}</p>
      </div>
    </div>
  );
};

const Emoji: FC<{ name: string; id: string; animated: boolean }> = ({ name, id, animated }) => {
  const hover = useContext(hoverContext);
  const url = `https://cdn.discordapp.com/emojis/${id}.${hover && animated ? "gif" : "webp"}?size=56&quality=lossless`;
  return <img className="inline-block h-5" src={url} alt={name} />;
};

const Mention: FC<{ name: string; prefix: string }> = ({ name, prefix }) => {
  return (
    <span className="rounded-sm bg-[#5865f2] bg-opacity-50 p-0.5 px-1 text-white">
      {prefix}
      {name}
    </span>
  );
};
