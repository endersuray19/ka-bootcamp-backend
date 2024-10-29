import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { categorySchema } from "@/schema/category";
import { ZodError } from "zod";
import { responeses } from "@/lib/respone";

export async function POST(request: Request) {
  try {
    const body = await request.json();
   
    categorySchema.parse(body);

    const db = new PrismaClient();
    const category = await db.category.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json({
      data: category,
      success: true,
      message: "Create category success",
    },{
      status:201,
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
export async function GET(request:Request){
  try{
    const db = new PrismaClient();

    const categories = await db.category.findMany();

    // return NextResponse.json({
    //   data:categories,
    //   success:true,
    //   message:"Get Categories success",
    // })
    return responeses({data:categories,success:true,message:"get category succeess",status:200})
  }
  catch (err: any) {
      return NextResponse.json({
        data: null,
        success: false,
        message: err?.message || "Internal server error",
      },{
      status:500,
     });
    }
  }
