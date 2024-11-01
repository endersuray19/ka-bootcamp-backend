import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verify";
import { orderSchema } from "@/schema/order";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type OrderPayload = {
  productId: number;
  stock: number;
};

export async function POST(request: Request) {
  try {
    const user = await verifyUser(request);

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    orderSchema.parse(body);

    if (body.items.length === 0) {
      return new NextResponse("Please add at least 1 product", { status: 400 });
    }

    const order = await prisma.$transaction(async (ctx) => {
      // Loop through items and check stock availability
      for (const item of body.items as OrderPayload[]) {
        const product = await ctx.product.findFirstOrThrow({
          where: {
            id: item.productId,
          },
        });

        if (item.stock > product.stock!) {
          throw new Error(
           ` Requested stock (${item.stock}) exceeds available stock (${product.stock}) for productId ${item.productId},`
          );
        }
      }

      // Create the order
      const createdOrder = await ctx.order.create({
        data: {
          status: "PENDING",
          userId: user.id,
          // items: {
          //   create: (body.items as OrderPayload[]).map((item) => ({
          //     colorId: item.colorId,
          //     productId: item.productId,
          //     quantity: item.quantity,
          //   })),
          // },
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      for (const item of body.items as OrderPayload[]) {
        await ctx.orderItems.create({
          data: {
            quantity: item.stock,
            productId: item.productId,
            orderId: createdOrder.id,
          },
        });
      }

      // Update stock for each item
      for (const item of body.items as OrderPayload[]) {
        await ctx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.stock,
            },
          },
        });
      }

      return createdOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues[0], { status: 400 });
    } else if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse(error.message, { status: 400 });
    } else if (error instanceof Error) {
      return new NextResponse(error.message, { status: 400 });
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
}