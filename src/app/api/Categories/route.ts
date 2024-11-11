import { responeses } from "@/lib/respone";
import { categorySchema } from "@/schema/category";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verify";
export async function POST(request:Request){
    try{
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
       const body = await request.json();
    categorySchema.parse(body);
    
    const category = await prisma.category.create({
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
      // // const user = await verifyUser(request);
      // console.log(user);
      // if(!user){
      //   return new NextResponse("unauthorized",{status:401});
      // }
    const category = await prisma.category.findMany() ;
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