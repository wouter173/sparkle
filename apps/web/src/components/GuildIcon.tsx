import React, { FC } from "react";
import Animated from "./Animated";

const GuildIcon: FC<{ iconId: string; guildId: string; className?: string }> = (props) => {
  const endpoint = `https://cdn.discordapp.com/icons/${props.guildId}/${props.iconId}`;

  if (props.iconId.startsWith("a_"))
    return <Animated className={props.className} endpoint={endpoint} alt="Guild Icon" />;
  return <img className={props.className} src={endpoint + ".webp"} alt="Guild Icon" />;
};

export default GuildIcon;
