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

export default function InvitePeople() {
  const { open, onOpen, onClose, type, data } = useModalStore();
  const isOpen = open && type === "invite";
  const origin = useOrigin();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false)

  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

  const generateNewLink = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `/api/servers/${data.server?.id}/invite-code`
      );

      onOpen('invite', {server: res.data})
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onCopy = () =>  {
    setCopied(true)
    navigator.clipboard.writeText(inviteUrl)

    setTimeout(() => {
      setCopied(false)
    }, 1000);

  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-sm font-semibold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex flex-row items-center">
            <Input
              disabled={loading}
              className="bg-zinc-500/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
              value={inviteUrl}
            />
            <Button onClick={onCopy} size={"icon"} disabled={loading}>
            {copied ? (
              <Check color="green" className="w-4 h-4 ml-2" />
            ): (
              <Copy className="w-4 h-4 ml-2" />
            )} 
            </Button>
          </div>
          <Button
            disabled={loading}
            onClick={generateNewLink}
            variant={"link"}
            size={"sm"}
            className="text-xs text-zinc-500 mt-4"
          >
            Generate new link <RefreshCw className="w-4 h-4 ml-2" />{" "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
