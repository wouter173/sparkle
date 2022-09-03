import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import TextTruncate from "react-text-truncate";
import GuildIcon from "../../components/GuildIcon";
import { Message } from "../../components/Message";
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

export default guildPage;
