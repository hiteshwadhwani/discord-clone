import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./ServerHeader";
import SearchBar from "./search-bar";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMemeber from "./server-member";

interface ServerIdProps {
  serverId: string;
}

const channelIconMap = {
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
};

const memberIconMap = {
  [MemberRole.ADMIN]: <Mic className="h-4 w-4 mr-2" />,
  [MemberRole.GUEST]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
};

const ServerSideBar: React.FC<ServerIdProps> = async ({ serverId }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  // console.log(server)
  if (!server) {
    return redirect("/");
  }
  const textChannel = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannel = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannel = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server.members.filter(
    (member) => member.profileId !== profile?.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col w-full h-full text-primary dark:bg-[#2B2D31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <SearchBar
          data={[
            {
              label: "Audio channel",
              type: "channel",
              data: audioChannel.map((channel) => {
                return {
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                };
              }),
            },
            {
              label: "Video channel",
              type: "channel",
              data: videoChannel.map((channel) => {
                return {
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                };
              }),
            },
            {
              label: "Text channel",
              type: "channel",
              data: textChannel.map((channel) => {
                return {
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                };
              }),
            },
            {
              label: "members",
              type: "member",
              data: members.map((member) => {
                return {
                  icon: memberIconMap[member.role],
                  name: member.profile.name,
                  id: member.id,
                };
              }),
            },
          ]}
        />

        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        {textChannel.length > 0 && (
          <div className="mb-2">
            <ServerSection
              label="text channel"
              role={role}
              channelType={ChannelType.TEXT}
              sectionType="channel"
            />
            <div className="space-y-2">
              {textChannel.map((channel) => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
        {audioChannel.length > 0 && (
          <div className="mb-2">
            <ServerSection
              label="audio channel"
              role={role}
              channelType={ChannelType.AUDIO}
              sectionType="channel"
            />
            <div className="space-y-2">
              {audioChannel.map((channel) => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
        {videoChannel.length > 0 && (
          <div className="mb-2">
            <ServerSection
              label="video channel"
              role={role}
              channelType={ChannelType.VIDEO}
              sectionType="channel"
            />
            <div className="space-y-2">
              {videoChannel.map((channel) => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
         {members.length > 0 && (
          <div className="mb-2">
            <ServerSection
              label="members"
              role={role}
              sectionType="member"
              server={server}
            />
            <div className="space-y-2">
              {members.map((member) => (
                <ServerMemeber member={member} key={member.id} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
export default ServerSideBar;
