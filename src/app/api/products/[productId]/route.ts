import { productSchema } from "@/schema/product";
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PATCH(request:Request,{params}:{params:{
    productId:string
}}){
    try{
        const body = await request.json();
        productSchema.parse(body);
        const db = new PrismaClient();
        const product = db.product.findFirst({
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
        const db = new PrismaClient();
        const product = db.product.delete({
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