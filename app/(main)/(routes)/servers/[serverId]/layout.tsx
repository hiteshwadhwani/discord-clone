import ServerSideBar from "@/components/server/ServerSideBar"
import currentProfile from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import React from "react"

const ServerLayout = async ({children, params} : {children:React.ReactNode, params: {serverId: string}}) => {
    const profile = await currentProfile()
    if(!profile){
        return redirectToSignIn()
    }
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (!server){
        return redirect('/')
    }
    return (
        <div>
            <div className="hidden md:flex flex-col fixed w-60 inset-y-0 h-full">
                <ServerSideBar serverId={params.serverId} />
            </div>
            <main className="md:pl-60 h-full w-full">
                {children}
            </main>
        </div>
    )
}
export default ServerLayout