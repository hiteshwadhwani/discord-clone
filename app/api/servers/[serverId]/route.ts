import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intitalProfile";
import { NextResponse } from "next/server";
  


export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const serverId = params.serverId;
    const data = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("No server id", { status: 400 });
    }

    const updatedServer = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data,
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

    return NextResponse.json(updatedServer, { status: 200 });
  } catch (error) {
    console.log("PATCH SERVER/[SERVERID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
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

    const deleteServer = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id
      }
    })

    return NextResponse.json(deleteServer, { status: 200 });
  } catch (error) {
    console.log("PATCH SERVER/[SERVERID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
