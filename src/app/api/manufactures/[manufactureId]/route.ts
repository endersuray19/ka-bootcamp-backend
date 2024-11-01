import { responeses } from "@/lib/respone";
import { verifyUser } from "@/lib/verify";
import { manufactureSchema } from "@/schema/manufacture";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PATCH(request:Request,{params}:{params:{manufactureId:string}}){
    try{
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
        const body = await request.json();
        
        manufactureSchema.parse(body);

        const db =  new PrismaClient();

        const manufacture = await db.manufacture.findFirst({
            where:{
                id:Number(params.manufactureId),
            }
        })
        if(!manufacture){
            return NextResponse.json({
              data: null,
              success: false,
              message: " manufacture not found",
            });
          }
          return NextResponse.json({
            data: manufacture,
            success: true,
            message: "Create manufacture success",
          });
    }catch (err: any) {
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
export async function DELETE(request:Request,{params}:{params:{manufactureId:string}}) {
  try
  {
    const user = await verifyUser(request);
    console.log(user);
    if(!user){
      return new NextResponse("unauthorized",{status:401});
    }
    const body = await request.json();

    manufactureSchema.parse(body);

    const db = new PrismaClient();

    const manufacture = await  db.manufacture.delete({
      where:{
        id:Number(params.manufactureId),
      }
    })
      if(!manufacture){
        return NextResponse.json({
          data: null,
          success: false,
          message: " manufacture not found",
        });
      }
      return NextResponse.json({
        data: manufacture,
        success: true,
        message: "Delete manufacture success",
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
  