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
    <main className="h-screen w-full overflow-scroll bg-body">
      <Nav />
      <section className="min-h-[calc(100vh-80px)] bg-main">
        <GuildMessagesView id={id} />
      </section>
    </main>
  );
};

const GuildMessagesView: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["guildMessages", { guildId: id }]);

  if (isLoading || data == undefined) return <>Loading</>;

  return (
    <ul className="mx-auto flex w-[32em] flex-col gap-12">
      {data.map((msg) => (
        <li key={msg.id} className="text-white">
          <article className="flex w-full flex-row">
            <img src={msg.author.avatar} alt="" className="mr-2 h-12 rounded-full" />
            <div className="flex flex-col gap-2">
              {msg.message ? (
                <div className="w-fit rounded-xl border border-main bg-black p-2 px-3">{msg.message}</div>
              ) : null}

              {msg.attachments.length != 2 ? (
                <>
                  <ul className="flex w-full flex-col gap-2">
                    {(JSON.parse(msg.attachments) as APIAttachment[]).map((attachment) => (
                      <li
                        key={attachment.id}
                        className="w-full overflow-hidden  rounded-xl border border-main bg-black"
                      >
                        <img src={attachment.url} alt={attachment.description} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <ul className="flex flex-row">
                <li className="rounded-lg border border-main bg-black px-2 py-1 text-sm">✨{msg.reactions}</li>
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default guildPage;
