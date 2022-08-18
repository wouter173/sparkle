import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import Nav from "../../components/Nav";
import { trpc } from "../../utils/trpc";

const guildPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || Array.isArray(id)) return <></>;

  return (
    <main className="bg-main h-screen w-full">
      <Nav />
      <GuildMessagesView id={id} />
    </main>
  );
};

const GuildMessagesView: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["guildMessages", { guildId: id }]);

  if (isLoading || data == undefined) return <>Loading</>;

  return (
    <section>
      <ul className="w-[32em] mx-auto gap-4 flex flex-col">
        {data.map((msg) => (
          <li key={msg.id} className="text-white">
            <article className="w-full flex flex-row">
              <img src={msg.author.avatar} alt="" className="h-12 rounded-full" />
              <div className="flex flex-col">
                <div className="p-4 rounded-lg bg-opacity-20 bg-black">{msg.message}</div>
                <ul className="mt-1 flex flex-row">
                  <li className="text-sm bg-black bg-opacity-20 px-2 py-1 rounded-md">✨{msg.reactions}</li>
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default guildPage;
