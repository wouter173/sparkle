import { NextPage } from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import { trpc } from "../../utils/trpc";
import TextTruncate from "react-text-truncate";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { CrownIcon } from "../../components/Icons";
import GuildIcon from "../../components/GuildIcon";

const GuildSelector = () => {
  const { data: guilds, isLoading } = trpc.useQuery(["guilds"]);
  if (isLoading || guilds == undefined) return <div>Loading</div>;

  return (
    <section className="mx-auto mt-20 flex w-1/2">
      <ul className="grid grid-cols-2 justify-center gap-4 ">
        {guilds.map((guild) => {
          return (
            <li key={guild.id}>
              <Link href={"/guild/" + guild.id}>
                <article className="w-full cursor-pointer rounded-2xl border border-main bg-black p-5">
                  <section className="flex h-12 items-center">
                    <GuildIcon className="w-12 rounded-2xl" guildId={guild.id} iconId={guild.thumbnail} />
                    <h1 className="mx-4 w-full font-bold text-white">
                      <TextTruncate text={guild.name} line={2} />
                    </h1>
                    <CrownIcon className="ml-auto mb-auto w-8" />
                  </section>
                  <section className="mt-6 flex flex-row">
                    <ul className="flex w-fit flex-col text-sm font-semibold text-darkened">
                      <li>22k bullshit</li>
                      <li>huts nog meer</li>
                    </ul>
                    <ChevronRightIcon className="mt-auto ml-auto h-5 text-white" />
                  </section>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const guildPage: NextPage = () => {
  return (
    <main className="h-screen w-full bg-body">
      <Nav />
      <section className="min-h-[calc(100vh-80px)] w-full overflow-scroll bg-main">
        <GuildSelector />
      </section>
    </main>
  );
};

export default guildPage;
