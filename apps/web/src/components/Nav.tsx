import { Popover } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { CurrentUserAvatar } from "./Avatar";
import { LogoIconSansSerif } from "./Icons";
import { trpc } from "../utils/trpc";

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
  const { route } = useRouter();

  return (
    <nav className="sticky top-0 z-50 h-20 w-full border-b border-b-main bg-black bg-opacity-90 text-white backdrop-blur-md">
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
        <li className="ml-6">
          <UserManager />
        </li>
      </ul>
    </nav>
  );
};

const UserManager: FC = () => {
  const { data: session } = useSession();

  const userId = session ? (session.discordId as string) : "";
  const { isLoading, refetch, data: user } = trpc.useQuery(["user", { userId }], { enabled: false });

  useEffect(() => {
    if (session?.user?.id) {
      refetch();
    }
  }, [session]);

  if (session) {
    return (
      <Popover className="relative h-10 w-10">
        <Popover.Button>
          <CurrentUserAvatar userId={session?.discordId as string} className="h-10 rounded-full" />
        </Popover.Button>
        <Popover.Panel
          className="absolute right-0 z-30 grid w-max grid-cols-1 gap-2 rounded-xl border border-main bg-black p-2 px-3"
          as="div"
        >
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <>
              <p className="px-1 text-darkened">
                {user?.name}#{user?.discriminator}
              </p>
              <hr className="border-main" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex flex-row items-center justify-center rounded-md bg-main py-0.5 px-2 text-red-600 hover:bg-highlight"
              >
                Logout <ArrowLeftOnRectangleIcon className="ml-1 h-4" />
              </button>
            </>
          )}
        </Popover.Panel>
      </Popover>
    );
  }

  return (
    <button onClick={() => signIn("discord")} className="rounded-md border border-main bg-black p-2 px-3 text-white">
      Login
    </button>
  );
};

export default Nav;
