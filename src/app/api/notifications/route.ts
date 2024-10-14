import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json(notifications);
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { ids }: { ids: number[] } = await request.json();

    for (const id of ids) {
      await prisma.notification.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
