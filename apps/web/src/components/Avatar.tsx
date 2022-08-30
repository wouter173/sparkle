import { FC } from "react";
import { trpc } from "../utils/trpc";
import Animated from "./Animated";

export const CurrentUserAvatar: FC<{ userId: string; className?: string }> = (props) => {
  const { data: avatarId, isLoading } = trpc.useQuery(["avatarUrl", { userId: props.userId }]);
  if (isLoading || !avatarId) return null;

  return <Avatar {...props} avatarId={avatarId} />;
};

const Avatar: FC<{ userId: string; avatarId: string; className?: string }> = (props) => {
  const endpoint = `https://cdn.discordapp.com/avatars/${props.userId}/${props.avatarId}`;

  if (props.avatarId.startsWith("a_"))
    return <Animated className={props.className} endpoint={endpoint} alt="User Avatar" />;
  return <img className={props.className} src={endpoint + ".webp"} alt="User Avatar" />;
};

export default Avatar;
