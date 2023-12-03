'use client'

import { useModalStore } from "@/hooks/useModal"
import { ServerWithMembersWithProfiles } from "@/types"
import { ChannelType, MemberRole } from "@prisma/client"
import ActionTooltip from "../ActionTooltip"
import { Plus, Settings } from "lucide-react"
interface ServerSectionProps{
    label: string
    sectionType: "channel" | "member"
    role?: MemberRole
    channelType?: ChannelType
    server?: ServerWithMembersWithProfiles
}

const ServerSection = ({label, sectionType, role, channelType, server}: ServerSectionProps) => {
    const {onOpen} = useModalStore()

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs font-semibold uppercase text-zinc-500">{label}</p>
            {role !== MemberRole.GUEST && sectionType == 'channel' && (
                <ActionTooltip align="start" label="Create channel" side="top">
                    <button onClick={() => onOpen("create-channel")} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
            {role !== MemberRole.GUEST && sectionType == 'member' && (
                <ActionTooltip align="start" label="Manage members" side="top">
                    <button onClick={() => onOpen("manage-members", {server})} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Settings className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}
export default ServerSection