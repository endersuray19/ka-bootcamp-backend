import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { serieSchema } from "@/schema/serie";
import { ZodError } from "zod";
import { responeses } from "@/lib/respone";
import { verifyUser } from "@/lib/verify";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await verifyUser(request);
    console.log(user);
    if(!user){
      return new NextResponse("unauthorized",{status:401});
    }
    const body = await request.json();
   
    serieSchema.parse(body);

    const db = new PrismaClient();
    const serie = await db.serie.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json({
      data: serie,
      success: true,
      message: "Create serie success",
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
    
    const serie = await prisma.serie.findMany();

    // return NextResponse.json({
    //   data:categories,
    //   success:true,
    //   message:"Get Categories success",
    // })
    return responeses({data:serie,success:true,message:"get serie succeess",status:200})
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
