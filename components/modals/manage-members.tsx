"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useModalStore } from "@/hooks/useModal";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { ReactElement, useState } from "react";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap: Record<MemberRole, ReactElement | null> = {
  ADMIN: <ShieldCheck className="w-4 h-4 ml-2 text-rose-500" />,
  GUEST: null,
  MODERATOR: <ShieldAlert className="w-4 h-4 ml-2 text-zinc-500" />,
};

export default function ManageMembers() {
  const router = useRouter();
  const { open, onOpen, onClose, type, data } = useModalStore();
  const [loadingId, setLoadingid] = useState("");
  const isOpen = open && type === "manage-members";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const onkick = async (memberId: string) => {
    try {
      setLoadingid(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });
      const res = await axios.delete(url);
      router.refresh();
      onOpen("manage-members", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingid("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingid(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });
      const res = await axios.patch(url, { role });
      router.refresh();
      onOpen("manage-members", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingid("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage members
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            {server?.members.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[450px] p-4">
          {server?.members.map((member) => (
            <div
              key={member.id}
              className="flex flex-row items-center gap-x-1 mt-3"
            >
              <Avatar>
                <AvatarImage src={member.profile.imageUrl} />
              </Avatar>
              <div>
                <p className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name} {roleIconMap[member.role]}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {member.profile.email}
                </p>
              </div>
              {server.profileId != member.profileId &&
                loadingId != member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="h-4 w-4 mr-2" /> Guest{" "}
                                {member.role === "GUEST" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />{" "}
                                Moderator{" "}
                                {member.role === "MODERATOR" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onkick(member.id)}>
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId == member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
