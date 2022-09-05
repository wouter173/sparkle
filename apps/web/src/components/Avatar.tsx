import { FC, useState } from "react";
import { trpc } from "../utils/trpc";
import Animated from "./Animated";

export const CurrentUserAvatar: FC<{ userId: string; className?: string }> = (props) => {
  const { data: avatarId, isLoading } = trpc.useQuery(["avatarUrl", { userId: props.userId }]);
  if (isLoading || !avatarId) return null;

  return <Avatar {...props} avatarId={avatarId} className={props.className} />;
};

const Avatar: FC<{ userId: string; avatarId: string; className?: string }> = (props) => {
  const endpoint = `https://cdn.discordapp.com/avatars/${props.userId}/${props.avatarId}`;
  const [failed, setFailed] = useState<boolean>(false);

  const fallback = `https://cdn.discordapp.com/embed/avatars/${parseInt(props.userId) % 5}.png`;

  if (props.avatarId.startsWith("a_") && !failed)
    return (
      <Animated className={props.className} endpoint={endpoint} onError={() => setFailed(true)} alt="User Avatar" />
    );

  return (
    <img
      className={props.className}
      src={failed ? fallback : endpoint + ".webp"}
      alt="User Avatar"
      onError={() => setFailed(true)}
    />
  );
};

export default Avatar;
