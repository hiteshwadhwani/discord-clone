import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intitalProfile";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const user = await initialProfile();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("No server Id", { status: 400 });
    }

    const updateServer = await db.server.update({
      where: {
        id: params.serverId,
        profileId: user.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(updateServer);
  } catch (error) {
    console.log("[SERVERID/invite-people]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
