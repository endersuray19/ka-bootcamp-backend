import { responeses } from "@/lib/respone";
import { productSchema } from "@/schema/product";
import { PrismaClient } from "@prisma/client/extension";
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
        productSchema.parse(body);
        
        const category = await prisma.category.findFirst({
          where:{
            id:body.categoryId
          }
        });
        if (!category) {
          return NextResponse.json(
            {
              data: null,
              success: false,
              message: "Category not found",
            },
            {
              status: 404,
            },
          );
        }
    
        const manufacture = await prisma.manufacture.findFirst({
          where:{
            id:body.manufactureId
          }
        });
        if (!manufacture) {
          return NextResponse.json(
            {
              data: null,
              success: false,
              message: "manufacture not found",
            },
            {
              status: 404,
            },
          );
        }
        const serie = await prisma.serie.findFirst({
          where:{
            id:body.serieId
          }
        });
        if (!serie) {
          return NextResponse.json(
            {
              data: null,
              success: false,
              message: "serie not found",
            },
            {
              status: 404,
            },
          );
        }
        const product = await prisma.product.create({
            data:{
                title : body.title,
                price : body.price,
                categoryId : body.categoryId,
                manufactureId : body.manufactureId,
                serieId : body.serieId,
                images : body.images,
                description : body.description,
                stock:body.stock,
            }
        })
        return NextResponse.json({
            data: product,
            success: true,
            message: "Create product success",
          },{
            status:200,
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
      const user = await verifyUser(request);
      console.log(user);
      if(!user){
        return new NextResponse("unauthorized",{status:401});
      }
        const product = prisma.product.findMany();
        return responeses({data:product,success:true,message:"get product succeess",status:200})
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
  