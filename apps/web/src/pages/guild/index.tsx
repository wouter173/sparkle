import { NextPage } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { trpc } from "../../utils/trpc";

const GuildSelector = () => {
  const { data: guilds, isLoading } = trpc.useQuery(["guilds"]);
  if (isLoading || guilds == undefined) return <div>Loading</div>;

  return (
    <section className="w-full flex justify-center">
      <ul>
        {guilds.map((guild) => {
          return (
            <li key={guild.id}>
              <Link href={"/guild/" + guild.id}>
                <div>
                  <img src={guild.thumbnail} className="rounded-full border-2" />
                  <h1 className="text-white font-bold">{guild.name}</h1>
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
    <main className="w-full h-screen bg-gray-900">
      <Header />
      <section className="flex">
        <GuildSelector />
      </section>
    </main>
  );
};

export default guildPage;
