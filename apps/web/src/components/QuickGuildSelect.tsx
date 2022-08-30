import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { trpc } from "../utils/trpc";

const GuildItem: FC<{ name: string; thumbnail: string; preview?: boolean }> = (props) => {
  return (
    <div className={"flex items-center overflow-hidden whitespace-nowrap p-1"}>
      <img className="mr-1 h-6 rounded-full" src={props.thumbnail} alt="guild icon" />
      <p className="overflow-hidden text-ellipsis text-sm">{props.name}</p>
    </div>
  );
};

const QuickSelect: FC<{ currentId: string }> = (props) => {
  const router = useRouter();
  const [currentGuildId, setCurrentGuildId] = useState(props.currentId);
  const { data: guilds, isLoading } = trpc.useQuery(["guilds"]);

  if (isLoading || guilds == undefined) return null;

  return (
    <Listbox
      as="div"
      className="relative"
      value={currentGuildId}
      onChange={(guildId) => {
        setCurrentGuildId(guildId);
        router.push(`/guild/${guildId}`);
      }}
    >
      <Listbox.Button className="flex w-40 items-center rounded-lg border border-main p-1">
        <GuildItem
          name={guilds.find((g) => g.id == currentGuildId)?.name || ""}
          thumbnail={guilds.find((g) => g.id == currentGuildId)?.thumbnail || ""}
        />
        <SelectorIcon className="ml-auto h-5 flex-shrink-0 text-darkened"></SelectorIcon>
      </Listbox.Button>
      <Listbox.Options className="absolute top-12 flex w-full flex-col gap-2 rounded-lg border border-main bg-black p-1">
        {guilds
          .filter((guild) => guild.id != currentGuildId)
          .map((guild) => (
            <Listbox.Option key={guild.id} value={guild.id} className="cursor-pointer rounded-md hover:bg-highlight">
              <GuildItem name={guild.name} thumbnail={guild.thumbnail} />
            </Listbox.Option>
          ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default QuickSelect;
