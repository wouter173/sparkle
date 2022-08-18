import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Avatar from "./Avatar";

const NavLink: FC<{ active?: boolean; route: string; title: string }> = (props) => {
  return (
    <li className="flex h-full relative">
      <Link href={props.route}>
        <a className="h-full flex flex-col justify-center">{props.title}</a>
      </Link>
      {props.active ? <div className="h-[2px] bg-white w-full absolute bottom-0" /> : null}
    </li>
  );
};

const Nav: FC = () => {
  const { data: session } = useSession();
  const { route } = useRouter();

  return (
    <header className="bg-header h-20 text-white border-b-2 border-b-main">
      <ul className="h-full flex items-center w-3/4 mx-auto gap-4">
        <li>
          <Link href="/">
            <a className="font-bold text-3xl">Likey</a>
          </Link>
        </li>
        <li className="ml-auto h-full">
          <ul className="flex h-full gap-4">
            <NavLink route="/" title="Home" active={route == "/"} />
            <NavLink route="/guild" title="Guilds" active={route.startsWith("/guild")} />
          </ul>
        </li>
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
    </header>
  );
};

export default Nav;
