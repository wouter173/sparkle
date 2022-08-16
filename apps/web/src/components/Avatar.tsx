import { useSession } from "next-auth/react";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const avatarUrlContext = createContext<string | null>(null);

export const AvatarUrlContextProvider: FC<PropsWithChildren> = (props) => {
  const session = useSession();
  const avatarUrl = useAvatar(session.data ? (session.data.discordId as string) : "");
  return <avatarUrlContext.Provider value={avatarUrl}>{props.children}</avatarUrlContext.Provider>;
};

const Avatar: FC = () => {
  const avatarUrl = useContext(avatarUrlContext);

  return <img className="h-10 rounded-full" src={avatarUrl || ""} />;
};

const useAvatar = (id: string) => {
  const { data, refetch } = trpc.useQuery(["avatarUrl", { userId: id }], { enabled: false });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarUrl && id != "") refetch();
  }, [id]);

  useEffect(() => {
    if (data) setAvatarUrl(data);
  }, [data]);

  return avatarUrl;
};

export default Avatar;
