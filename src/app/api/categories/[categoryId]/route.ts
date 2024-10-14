import prisma from "@/lib/prisma";
import { client, connectRedis } from "@/lib/redis";
import { categorySchema } from "@/schema/category";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    // await connectRedis();

    // // Mendapatkan cache dari Redis
    // const cache = await client.hGetAll(`category-${params.categoryId}`);

    // // Memeriksa apakah cache kosong
    // if (Object.keys(cache).length > 0) {
    //   // Cache ada, kembalikan data dari cache
    //   return NextResponse.json(
    //     {
    //       message: "Cache",
    //       category: {
    //         ...cache,
    //         createdAt: new Date(cache.createdAt), // Mengembalikan createdAt ke format Date
    //       },
    //     },
    //     { status: 200 },
    //   );
    // }

    const category = await prisma.category.findFirst({
      where: {
        id: Number(params.categoryId),
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const body = await request.json();

    categorySchema.parse(body);

    const category = await prisma.category.findFirst({
      where: {
        id: Number(params.categoryId),
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: Number(params.categoryId),
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    await prisma.category.delete({
      where: {
        id: category.id,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
