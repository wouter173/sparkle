import React from "react";
import Nav from "../../components/Nav";

export default () => {
  return (
    <main className="h-screen w-full overflow-scroll bg-body">
      <Nav />
      <section className="min-h-[calc(100vh-80px)] bg-main">
        <div className="text-white">explore</div>
      </section>
    </main>
  );
};
