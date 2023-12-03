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

    const { imageUrl, name } = await req.json();

    // create new server
    const newServer = await db.server.create({
      data: {
        name: name,
        imageUrl: imageUrl,
        profileId: user.id,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: user.id }],
        },
        members: {
          create: [{ profileId: user.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(newServer);
  } catch (error) {
    console.log("[SERVERS_POST]:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}