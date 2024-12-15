import prisma from "@/lib/prisma";
import { responeses } from "@/lib/respone";
import { verifyUser } from "@/lib/verify";
import { manufactureSchema } from "@/schema/manufacture";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request:Request){
    try{
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
        const body = await request.json();

        manufactureSchema.parse(body);

        const db = new PrismaClient();
        const manufacture = await db.manufacture.create({
            data:{
                name:body.name,
            },
        })
        return responeses({data:manufacture,success:true,message:"post manfucature success",status:201})
    }
    catch(err:any){
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
      export async function GET(request:Request) {
        try{
          // // const user = await verifyUser(request);
          // console.log(user);
          // if(!user){
          //   return new NextResponse("unauthorized",{status:401});
          // }
        const manufacture = await prisma.manufacture.findMany() ;
        return responeses({data:manufacture,success:true,message:"get serie succeess",status:200})
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