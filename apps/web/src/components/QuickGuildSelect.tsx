import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { trpc } from "../utils/trpc";
import GuildIcon from "./GuildIcon";

const GuildItem: FC<{ name: string; guildId: string; thumbnail: string }> = (props) => {
  return (
    <div className={"flex items-center overflow-hidden whitespace-nowrap p-1"}>
      <GuildIcon guildId={props.guildId} iconId={props.thumbnail} className="mr-2 h-6 rounded-md" />
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
          guildId={guilds.find((g) => g.id == currentGuildId)?.id || ""}
          name={guilds.find((g) => g.id == currentGuildId)?.name || ""}
          thumbnail={guilds.find((g) => g.id == currentGuildId)?.thumbnail || ""}
        />
        <ChevronUpDownIcon className="ml-auto h-5 flex-shrink-0 text-darkened" />
      </Listbox.Button>
      <Listbox.Options className="absolute top-12 flex w-full flex-col gap-2 rounded-lg border border-main bg-black p-1">
        {guilds
          .filter((guild) => guild.id != currentGuildId)
          .map((guild) => (
            <Listbox.Option key={guild.id} value={guild.id} className="cursor-pointer rounded-md hover:bg-highlight">
              <GuildItem guildId={guild.id} name={guild.name} thumbnail={guild.thumbnail} />
            </Listbox.Option>
          ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default QuickSelect;
