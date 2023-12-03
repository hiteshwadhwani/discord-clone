import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intitalProfile";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
  


export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const serverId = params.serverId;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("No server id", { status: 400 });
    }

    const leaveServer = await db.server.update({
        where: {
            id: serverId,
            profileId: {
                not: profile.id
            },
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        data: {
            members: {
                deleteMany: {
                    profileId: profile.id
                }
            }
        }
    })

   
    return NextResponse.json(leaveServer, { status: 200 });
  } catch (error) {
    console.log("PATCH SERVER/[SERVERID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
