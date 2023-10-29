import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intitalProfile";
import { redirect } from "next/navigation";

const InvitePage = async ({ params }: { params: { inviteCode: string } }) => {
  const profile = await initialProfile();
  if (!profile) {
    return redirect("/");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  // find if user if the exisiting member of the server
  const existingMember = await db.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingMember) {
    return redirect(`/servers/${existingMember.id}`);
  }

  // create new member
  const server = await db.server.update({
    where: {
        inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return (
    <div>
        invite code
    </div>
  )
};
export default InvitePage
