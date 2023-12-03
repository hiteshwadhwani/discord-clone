import { Server } from '@prisma/client'
import {create} from 'zustand'

type ModalType = 'createStore' | 'invite' | 'update-server' | 'manage-members' | 'create-channel' | 'leave-server' | 'delete-server'

interface ModalData{
    server?: Server
}

interface ModalStore{
    open: boolean,
    type: ModalType | null
    data: ModalData
    onOpen: (type: ModalType, data?: ModalData) => void
    onClose: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    open: false,
    type: null,
    data: {},
    onOpen: (type, data = {}) => set({open: true, type, data:data}),
    onClose: () => set({open: false, type: null})
}))