import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(["messages"]);

  return (
    <>
      <Head>
        <title>Likey</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-main h-screen text-white">
        <Header />
        {session && <p>Logged in as {session?.user?.name}</p>}
        {isLoading ? (
          <p>Loading</p>
        ) : (
          data?.map((msg) => (
            <p key={msg.id}>
              {msg.message} - {msg.reactions}
            </p>
          ))
        )}
      </main>
    </>
  );
};

export default Home;
