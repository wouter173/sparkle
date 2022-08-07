import { NextPage } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { trpc } from "../../utils/trpc";

const GuildSelector = () => {
  const { data: guilds, isLoading } = trpc.useQuery(["guilds"]);
  if (isLoading || guilds == undefined) return <div>Loading</div>;

  return (
    <section className="w-full">
      <ul className="flex justify-center gap-4">
        {guilds.map((guild) => {
          return (
            <li key={guild.id}>
              <Link href={"/guild/" + guild.id}>
                <div className="w-36">
                  <img src={guild.thumbnail} className="rounded-full border-2" />
                  <h1 className="text-white font-bold text-ellipsis">{guild.name}</h1>
                </div>
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
    <main className="w-full h-screen bg-main">
      <Header />
      <section className="flex">
        <GuildSelector />
      </section>
    </main>
  );
};

export default guildPage;
