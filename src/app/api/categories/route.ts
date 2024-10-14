import prisma from "@/lib/prisma";
import { client, connectRedis } from "@/lib/redis";
import { categorySchema } from "@/schema/category";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    categorySchema.parse(body);

    const category = await prisma.category.create({
      data: {
        name: body.name,
      },
    });

    // Koneksi ke Redis
    await connectRedis();

    // Simpan data kategori yang baru ke Redis dengan TTL (misalnya 3600 detik = 1 jam)
    await client.hSet(`category-${category.id}`, {
      ...category,
      createdAt: category.createdAt.toISOString(), // Simpan tanggal sebagai string ISO
    });
    await client.expire(`category-${category.id}`, 3600); // Set TTL untuk 1 jam (3600 detik)

    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json(err.issues[0]);
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
}

export async function GET(request: Request) {
  try {
    const category = await prisma.category.findMany({});

    return NextResponse.json(category, { status: 200 });
  } catch (err: any) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
