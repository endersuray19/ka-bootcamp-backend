import { responeses } from "@/lib/respone";
import { manufactureSchema } from "@/schema/manufacture";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request:Request){
    try{
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
    const db = new PrismaClient();
    
    const manufactures = db.manufacture.findMany();

    return responeses({data:manufactures,success:true,message:"get data manfucatures",status:200});
}