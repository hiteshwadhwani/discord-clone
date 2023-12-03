'use client'

import { useEffect, useState } from "react"

import CreateServerModal from "@/components/modals/CreateServerModal"
import InvitePeople from "@/components/modals/invite-modal"
import UpdateServer from "@/components/modals/update-server"
import ManageMembers from "@/components/modals/manage-members"
import CreateChannel from "@/components/modals/create-channel"
import LeaveServer from "@/components/modals/leave-server"
import DeleteServer from "@/components/modals/delete-server"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if(!isMounted){
        return null
    }
    return (
        <>
            <CreateServerModal />
            <InvitePeople />
            <UpdateServer />
            <ManageMembers />
            <CreateChannel />
            <LeaveServer />
            <DeleteServer />
        </>
    )
}

export default ModalProvider