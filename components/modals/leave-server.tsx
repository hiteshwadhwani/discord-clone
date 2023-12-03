"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useModalStore } from "@/hooks/useModal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import useOrigin from "@/hooks/use-origin";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LeaveServer() {
  const router = useRouter()
  const { open, onOpen, onClose, type, data } = useModalStore();
  const isOpen = open && type === "leave-server";
  const [loading, setLoading] = useState(false);

  const onClick =  async () => {
    try{
      setLoading(true)
      await axios.patch(`/api/servers/${data.server?.id}/leave`)
      router.refresh()
      window.location.reload()
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leaver Server
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          Do you really want to leave {data.server?.name} ?
        </DialogDescription>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
          <Button onClick={() => onClose()} className="hover:bg-gray-100 text-muted-foreground hover:text-muted" disabled={loading} variant="ghost">
              Cancel
            </Button>
            <Button onClick={() => onClick()} disabled={loading} variant="destructive">
              Leave
            </Button>
          </div>
           
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
