"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const iconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
};

interface ServerMemberProps {
  member: Member & { profile: Profile };
}


const ServerMemeber = ({ member }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();
  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  };
  return (
    <button
      onClick={() => onClick()}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={member.profile.imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className={cn("font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition", params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")}>
        {member.profile.name}
      </p>

    </button>
  );
};
export default ServerMemeber;
