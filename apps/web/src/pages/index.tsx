import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Likey</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-main text-white">
        <Nav />
      </main>
    </>
  );
};

export default Home;
