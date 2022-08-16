import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

export const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-header h-16 text-white">
      <ul className="h-full flex items-center w-5/6 mx-auto gap-4">
        <li>
          <Link href="/">
            <a className="font-bold text-3xl">Likey</a>
          </Link>
        </li>
        <li>
          <Link href="/guild">
            <a>guilds</a>
          </Link>
        </li>
        <li className="ml-auto">
          <Avatar />
        </li>
        <li>
          <button
            onClick={() => (session ? signOut({ callbackUrl: "/" }) : signIn("discord", { callbackUrl: "/guild" }))}
            className="bg-gray-700 bg-opacity-80 py-2 px-4 text-red-200 rounded-md"
          >
            {session ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </header>
  );
};
