import { DiscordUser, Guild, Message } from "db";
import { APIAttachment } from "discord-api-types/v10";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import TextTruncate from "react-text-truncate";
import Avatar from "../../components/Avatar";
import GuildIcon from "../../components/GuildIcon";
import Nav from "../../components/Nav";
import QuickGuildSelect from "../../components/QuickGuildSelect";
import { trpc } from "../../utils/trpc";

const guildPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || Array.isArray(id)) return null;

  return (
    <main className="h-screen w-full overflow-scroll bg-body">
      <Nav>
        <QuickGuildSelect currentId={id} />
      </Nav>
      <section className="min-h-[calc(100vh-80px)] bg-main">
        <GuildHeader id={id} />
        <GuildMessagesView id={id} />
      </section>
    </main>
  );
};

const GuildHeader: FC<{ id: string }> = ({ id }) => {
  const { data: guild, isLoading } = trpc.useQuery(["guild", { guildId: id }]);

  if (isLoading || guild == undefined) return null;

  return (
    <header className="mx-auto mb-10 w-[32em] pt-10">
      <section className="mb-6 flex items-center">
        <GuildIcon iconId={guild.thumbnail} guildId={guild.id} className="w-14 rounded-2xl border border-main" />
        <h1 className="ml-4 text-lg font-bold text-white">
          <TextTruncate line={2} text={guild.name}></TextTruncate>
        </h1>
      </section>
      <hr className="border-main" />
    </header>
  );
};

const GuildMessagesView: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["guildMessages", { guildId: id }]);

  if (isLoading || data == undefined) return <>Loading</>;

  return (
    <ul className="mx-auto flex w-[32em] flex-col gap-12">
      {data.map((msg) => (
        <li key={msg.id} className="text-white">
          <Message msg={msg} />
        </li>
      ))}
    </ul>
  );
};

const Message: FC<{ msg: Message & { guild: Guild; author: DiscordUser } }> = ({ msg }) => {
  const splitContent = msg.message.split(/(<a?:\w+:\d+>)/);
  const contentElements = splitContent.map((slice) => {
    const matches = slice.match(/(<a?:(?<name>\w+):(?<id>\d+)>)/);
    if (!matches) return slice;

    const { name, id } = matches.groups!;
    return () => <Emoji name={name || ""} id={id || ""} />;
  });

  const content = (
    <>
      {contentElements.map((El, i) => {
        if (typeof El === "string") return El;
        return <El key={msg.id + "-" + i} />;
      })}
    </>
  );

  const attachments = JSON.parse(msg.attachments) as APIAttachment[];

  return (
    <article className="flex w-full flex-row">
      <Avatar avatarId={msg.author.avatar} userId={msg.author.id} className="mr-2 h-12 rounded-full" />
      <div className="flex flex-col gap-2">
        {contentElements.length > 0 ? (
          <div className="w-fit rounded-xl border border-main bg-black p-2 px-3">{content}</div>
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

export default guildPage;
