import { productSchema } from "@/schema/product";
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verify";
export async function PATCH(request:Request,{params}:{params:{
    productId:string
}}){
    try{
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
        const body = await request.json();
        productSchema.parse(body);
       
        const product = await prisma.product.findFirst({
            where:{
                id:Number(params.productId),
            }
        })
    if(!product){
        return NextResponse.json({
          data: null,
          success: false,
          message: " product not found",
        });
      }
      return NextResponse.json({
        data: product,
        success: true,
        message: "Create product success",
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
  export async function DELETE(request:Request,{params}:{params:{productId:string}}) {
    try{
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
        const product = prisma.product.delete({
            where:{
                id:Number(params.productId),
            }
        })
        if(!product){
            return NextResponse.json({
              data: null,
              success: false,
              message: " product not found",
            });
          }
          return NextResponse.json({
            data: product,
            success: true,
            message: "Delete product success",
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