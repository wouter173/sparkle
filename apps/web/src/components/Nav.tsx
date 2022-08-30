import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useState } from "react";
import Avatar from "./Avatar";
import { LogoIconSansSerif } from "./Icons";

const NavLink: FC<{ active?: boolean; route: string; title: string }> = (props) => {
  return (
    <li className="relative flex h-full">
      <Link href={props.route}>
        <a className="flex h-full flex-col justify-center">{props.title}</a>
      </Link>
      {props.active ? <div className="absolute bottom-0 h-[2px] w-full bg-white" /> : null}
    </li>
  );
};

const Nav: FC<PropsWithChildren> = (props) => {
  const { data: session } = useSession();
  const { route } = useRouter();

  return (
    <nav className="sticky top-0 h-20 w-full border-b border-b-main bg-black bg-opacity-90 text-white backdrop-blur-md">
      <ul className="mx-auto flex h-full w-3/4 items-center gap-4">
        <li>
          <Link href="/">
            <div className="relative h-7 cursor-pointer">
              <LogoIconSansSerif className="h-full fill-[url(#gradient)] transition-all" />
            </div>
          </Link>
        </li>
        <li className="ml-4 h-full">
          <ul className="flex h-full gap-4">
            <NavLink route="/explore" title="Explore" active={route == "/explore"} />
            <NavLink route="/guild" title="Guilds" active={route.startsWith("/guild")} />
          </ul>
        </li>
        <li className="ml-auto">{props.children}</li>
        <li className="ml-14">
          <Avatar />
        </li>
        {/* <li>
          <button
            onClick={() => (session ? signOut({ callbackUrl: "/" }) : signIn("discord", { callbackUrl: "/guild" }))}
            className="bg-gray-700 bg-opacity-80 py-2 px-4 text-red-200 rounded-md"
          >
            {session ? "Logout" : "Login"}
          </button>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
