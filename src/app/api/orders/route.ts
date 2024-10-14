import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { orderSchema } from "@/schema/order";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type OrderPayload = {
  productId: number;
  colorId: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    orderSchema.parse(body);

    if (body.items.length === 0) {
      return new NextResponse("Please add minimum 1 product", { status: 400 });
    }

    for (const item of body.items as OrderPayload[]) {
      const color = await prisma.color.findFirstOrThrow({
        where: {
          id: item.colorId,
          productId: item.productId,
        },
      });

      if (item.quantity > color.quantity) {
        return new NextResponse(
          `Requested quantity (${item.quantity}) exceeds available stock (${color.quantity}) for productId ${item.productId}`,
          { status: 400 },
        );
      }
    }

    const order = await prisma.order.create({
      data: {
        status: "PENDING",
        userId: body.userId,
        items: {
          create: (body.items as OrderPayload[]).map((item) => ({
            colorId: item.colorId,
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        user: true,
      },
    });

    for (const item of body.items as OrderPayload[]) {
      const color = await prisma.color.findFirstOrThrow({
        where: {
          id: item.colorId,
          productId: item.productId,
        },
      });

      await prisma.color.update({
        where: {
          id: color.id,
        },
        data: {
          quantity: color.quantity - item.quantity,
        },
      });
    }

    await prisma.notification.create({
      data: {
        title: "Order created",
        description: `${order.user.email} create order`,
        link: `/order/${order.id}`,
      },
    });

    await pusherServer.trigger(`notifications`, "new-notification", "");

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues[0], { status: 400 });
    } else {
      return new NextResponse("Internal server error", {
        status: 500,
      });
    }
  }
}
