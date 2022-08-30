import React from "react";
import Animated from "../../components/Animated";
import Nav from "../../components/Nav";

export default () => {
  return (
    <main className="h-screen w-full overflow-scroll bg-body">
      <Nav />
      <section className="min-h-[calc(100vh-80px)] bg-main">
        <div className="text-white">explore</div>
        <Animated endpoint="https://cdn.discordapp.com/icons/846468617142009917/a_468c11dc43bc565b7c22a2687096c8d4" />
      </section>
    </main>
  );
};
