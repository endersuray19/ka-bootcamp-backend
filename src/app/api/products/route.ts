import { responeses } from "@/lib/respone";
import { productSchema } from "@/schema/product";
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request:Request){
    try{
        const body = await request.json();
        productSchema.parse(body);
        const db = new PrismaClient();
        const product = db.product.create({
            data:{
                title : body.title,
                price : body.price,
                categoryId : body.categoryId,
                manufacturId : body.manufacturId,
                serieId : body.serieId,
                description : body.description,
            }
        })
        return NextResponse.json({
            data: product,
            success: true,
            message: "Create product success",
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
export async function GET(request:Request,{params}:{params:{productId : string}}) {
    try{
        const db = new PrismaClient();
        const product = db.product.findMany();
        return responeses({data:product,success:true,message:"get serie succeess",status:200})
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
  