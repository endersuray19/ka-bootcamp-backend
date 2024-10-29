import { responeses } from "@/lib/respone";
import { categorySchema } from "@/schema/category";
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request:Request){
    try{
       const body = await request.json();
    categorySchema.parse(body);
    const db = new PrismaClient;
    const category = db.category.create({
        data:{
            name: body.name,
        }
    }) 
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
  export async function GET(request:Request,{params}:{params :{
    categoryId:string;
  }}) {
    try{
        const db = new PrismaClient;
    const category = db.category.findMany() ;
    return responeses({data:category,success:true,message:"get serie succeess",status:200})
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