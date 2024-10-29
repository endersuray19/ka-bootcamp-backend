import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { serieSchema } from "@/schema/serie";
import { number, ZodError } from "zod";
import { responeses } from "@/lib/respone";

export async function PATCH(
  request: Request
  ,{params} :{params:
    { serieId: string } },
  ) {
  try {
    const body = await request.json();
   
    serieSchema.parse(body);

    const db = new PrismaClient();
    const serie = await db.serie.findFirst({
      where:{
        id:Number(params.serieId),
      }
    })
    if(!serie){
      return NextResponse.json({
        data: null,
        success: false,
        message: " serie not found",
      });
    }
    return NextResponse.json({
      data: serie,
      success: true,
      message: "Create serie success",
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
    { serieId: string } },
  ) {
  try {
    const body = await request.json();
   
    serieSchema.parse(body);

    const db = new PrismaClient();
    const serie = await db.serie.delete({
      where:{
        id:Number(params.serieId),
      }
    })
    if(!serie){
      return NextResponse.json({
        data: null,
        success: false,
        message: " serie not found",
      });
    }
    return NextResponse.json({
      data: serie,
      success: true,
      message: "Delete serie success",
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