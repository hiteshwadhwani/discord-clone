import currentProfile from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { ChannelType } from "@prisma/client"
import { redirect } from "next/navigation"
import React from "react"
import ServerHeader from "./ServerHeader"

interface ServerIdProps{
    serverId: string
}

const ServerSideBar: React.FC<ServerIdProps> = async ({serverId}) => {
    const profile = await currentProfile()
    if(!profile){
        return redirect('/')
    }
    const server = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc'
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: 'asc'
                }
            }
        }
    })
    // console.log(server)
    if(!server){
        return redirect('/')
    }
    const textChannel = server.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannel = server.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannel = server.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server.members.filter((member) => member.profileId !== profile?.id)

    const role = server.members.find(member => member.profileId === profile.id)?.role

    return (
        <div className="flex flex-col w-full h-full text-primary dark:bg-[#2B2D31] bg-[#f2f3f5]">
            <ServerHeader server={server} role={role} />
        </div>
    )
}
export default ServerSideBar