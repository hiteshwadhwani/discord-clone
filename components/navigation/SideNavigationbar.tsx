import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./NavigationAction";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../ui/ModeToggle";
import { ScrollArea } from "../ui/scroll-area";
import { UserButton } from "@clerk/nextjs";
import NavigationItem from "./NavigationItem";

const SideNavigationbar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  // find all the server of the user
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="h-full flex flex-col space-y-4 items-center w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
            <div key={server.id} className="mb-4">
                <NavigationItem {...server} />
            </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex flex-col items-center gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
export default SideNavigationbar;
