import { NextPage } from "next";
import { Header } from "../../components/Header";
import { Message } from "../../components/Message";

const guildPage: NextPage = () => (
  <main className="bg-main h-screen w-full">
    <Header />
    <section>
      <ul>
        <li className="text-white">
          <Message />
        </li>
      </ul>
    </section>
  </main>
);

export default guildPage;
