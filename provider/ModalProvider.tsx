'use client'

import { useEffect, useState } from "react"

import CreateServerModal from "@/components/modals/CreateServerModal"
import InvitePeople from "@/components/modals/invite-modal"
import UpdateServer from "@/components/modals/update-server"
import ManageMembers from "@/components/modals/manage-members"

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
        </>
    )
}

export default ModalProvider