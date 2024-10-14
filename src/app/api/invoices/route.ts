import prisma from "@/lib/prisma";
import { generateXenditUrl } from "@/lib/xendit";
import { invoiceSchema } from "@/schema/invoice";
import { Address, OrderItemsQuantity } from "@/types/type";
import { NextResponse } from "next/server";

type InvoiceBody = {
  orderId: number;
  city: string;
  country: string;
  postalCode: string;
  state: string;
  streetLine1?: string;
  streetLine2?: string;
};

export async function POST(request: Request) {
  try {
    const body: InvoiceBody = await request.json();
    invoiceSchema.parse(body);

    const order = await prisma.order.findFirstOrThrow({
      where: {
        id: body.orderId,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            phoneNumber: true,
          },
        },
      },
    });

    const orderItems = await prisma.orderItems.findMany({
      where: {
        orderId: order.id,
      },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        color: true,
      },
    });

    const address: Address = {
      city: body.city,
      country: body.country,
      postalCode: body.postalCode,
      state: body.state,
      streetLine1: body.streetLine1,
      streetLine2: body.streetLine2,
    };

    const items: OrderItemsQuantity[] = orderItems.map((item) => ({
      category: item.product.category.name,
      color: item.color.color,
      quantity: item.quantity,
      name: `${item.product.name} - ${item.color.color}`,
      price: item.product.price,
    }));

    const xendit = await generateXenditUrl(
      address,
      body.orderId,
      order.user,
      items,
    );

    if (xendit === null) {
      return new NextResponse("Xendit generate url error, please try again", {
        status: 500,
      });
    }

    await prisma.invoice.create({
      data: {
        orderId: body.orderId,
        amount: items.reduce((a, b) => a + b.price * b.quantity, 0),
        city: body.city,
        country: body.country,
        postalCode: body.postalCode,
        state: body.state,
        status: "PENDING",
        streetLine1: body.streetLine1,
        streetLine2: body.streetLine2,
        xenditUrl: xendit,
      },
    });

    return NextResponse.json({ url: xendit }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
