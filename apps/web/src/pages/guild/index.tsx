import { NextPage } from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import { trpc } from "../../utils/trpc";

const GuildSelector = () => {
  const { data: guilds, isLoading } = trpc.useQuery(["guilds"]);
  if (isLoading || guilds == undefined) return <div>Loading</div>;

  return (
    <section className="w-full mt-20">
      <ul className="grid grid-cols-2 justify-center gap-4 ">
        {guilds.map((guild) => {
          return (
            <li key={guild.id}>
              <Link href={"/guild/" + guild.id}>
                <div className="w-full bg-header">
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
      <Nav />
      <section className="flex w-1/2 mx-auto">
        <GuildSelector />
      </section>
    </main>
  );
};

export default guildPage;
