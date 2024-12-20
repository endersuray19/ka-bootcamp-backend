import { categorySchema } from "@/schema/category";
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verify";
export async function PATCH(request:Request,{params}:{params :{categoryId:string}}) {
    try{
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
        const body = await request.json();
        categorySchema.parse(body);
        
        const category = prisma.category.findFirst({
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
export async function  DELETE(request:Request,{params}:{params:{categoryId:string}}) {
    try{
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
       
        const category = prisma.category.delete({
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