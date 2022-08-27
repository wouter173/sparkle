import { APIAttachment } from "discord-api-types/v10";
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
    <main className="h-screen w-full overflow-scroll bg-main">
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
      <ul className="mx-auto flex w-[32em] flex-col gap-4">
        {data.map((msg) => (
          <li key={msg.id} className="text-white">
            <article className="flex w-full flex-row">
              <img src={msg.author.avatar} alt="" className="h-12 rounded-full" />
              <div className="flex flex-col">
                <div className="rounded-lg bg-black bg-opacity-20 p-4">{msg.message}</div>
                <ul className="w-full">
                  <>
                    {(JSON.parse(msg.attachments) as APIAttachment[]).map((attachment) => (
                      <li key={attachment.id} className="w-full">
                        <img src={attachment.url} alt={attachment.description} />
                      </li>
                    ))}
                  </>
                </ul>
                <ul className="mt-1 flex flex-row">
                  <li className="rounded-md bg-black bg-opacity-20 px-2 py-1 text-sm">✨{msg.reactions}</li>
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
