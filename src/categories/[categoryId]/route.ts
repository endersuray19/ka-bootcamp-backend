import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { categorySchema } from "@/schema/category";
import { number, ZodError } from "zod";
import { responeses } from "@/lib/respone";

export async function PATCH(
  request: Request
  ,{params} :{params:
    { categoryId: string } },
  ) {
  try {
    const body = await request.json();
   
    categorySchema.parse(body);

    const db = new PrismaClient();
    const category = await db.category.findFirst({
      where:{
        id:Number(params.categoryId),
      }
    })
    if(!category){
      return NextResponse.json({
        data: null,
        success: false,
        message: " category not found",
      });
    }
    return NextResponse.json({
      data: category,
      success: true,
      message: "Create category success",
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json({
        data: null,
        success: false,
        message: err.issues[0],
      },{
        status:400
      });
    } else {
      return NextResponse.json({
        data: null,
        success: false,
        message: err?.message || "Internal server error",
      },{
      status:500
     });
    }
  }
}
export async function DELETE(
  request: Request
  ,{params} :{params:
    { categoryId: string } },
  ) {
  try {
    const body = await request.json();
   
    categorySchema.parse(body);

    const db = new PrismaClient();
    const category = await db.category.delete({
      where:{
        id:Number(params.categoryId),
      }
    })
    if(!category){
      return NextResponse.json({
        data: null,
        success: false,
        message: " category not found",
      });
    }
    return NextResponse.json({
      data: category,
      success: true,
      message: "Delete category success",
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json({
        data: null,
        success: false,
        message: err.issues[0],
      },{
        status:400
      });
    } else {
      return NextResponse.json({
        data: null,
        success: false,
        message: err?.message || "Internal server error",
      },{
      status:500
     });
    }
  }
}