import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intitalProfile";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const user = await currentProfile();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("serverId is missing", { status: 400 });
    }
    const { name, type } = await req.json();

    if (!name || !type) {
      return new NextResponse("some fields are missing", { status: 400 });
    }

    if (name == "general") {
      return new NextResponse("name of channel cannot be general", {
        status: 400,
      });
    }

    const createChannel = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name: name,
            type: type,
            profileId: user.id,
          },
        },
      },
    });

    return NextResponse.json(createChannel);
  } catch (error) {
    console.log("[SERVERS_POST]:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
