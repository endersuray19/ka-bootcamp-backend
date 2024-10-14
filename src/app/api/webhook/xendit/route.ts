import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("x-callback-token");

    if (token !== process.env.XENDIT_WEBHOOK_TOKEN) {
      return new NextResponse("This is not from xendit", { status: 403 });
    }

    const body = await request.json();

    const invoice = await prisma.invoice.findFirstOrThrow({
      where: {
        id: Number(body.external_id),
      },
      include: {
        order: {
          include: {
            items: true,
          },
        },
      },
    });

    if (body.status === "PAID") {
      await prisma.invoice.update({
        where: {
          id: invoice.id,
        },
        data: {
          status: body.status,
          paymentChannel: body.payment_channel,
          paymentMethod: body.payment_method,
        },
      });
    } else {
      for (const item of invoice.order?.items!) {
        await prisma.color.update({
          where: {
            id: item.colorId,
          },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });
      }
    }

    return NextResponse.json(body, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
