import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verify";
import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";
export async function PATCH(request:Request, {params}:{params:{orderId:string}}){
    try{
        const user = await verifyUser(request);
        if(!user){
            return new NextResponse("unauthorized",{status:401});
        }
        const order = await prisma.order.findFirst({
            where:{
                id:Number(params.orderId),
                userId:user.id
            },include:{
                items:{
                    include:{
                        product:true
                    }
                }
            }
        })
        if(!order){
            return  NextResponse.json(
                {data:null,
                message:"order not found"
                },{status:404});
        }
        const {status}:{status:OrderStatus} = await request.json();
        if(status === "CANCELED" ){
            await prisma.$transaction(async (ctx)=>{
                await ctx.order.update({
                    where:{id:order.id},
                    data:{
                        status:OrderStatus.CANCELED
                    }
                });
                for(const item of order.items){
                    const {productId,quantity, ...prop} = item;
                    await ctx.product.update({
                        where:{id:productId},
                        data:{
                            stock: {increment:quantity}
                        }
                    })
                }
            })
        }else if(status === "SENDING"){
            await prisma.order.update({
                where:{id:order.id},
                data:{
                    status:OrderStatus.SENDING
                }
            });
        }
        return NextResponse.json({data:order,message:"order status updated"},{status:200});
    }catch(error:any){
        return new NextResponse("Internal server error",{status:500});
    }
}

export async function GET(request:Request, {params}:{params:{orderId:string}}){
    try{
      const user = await verifyUser(request);
          console.log(user);
          if(!user){
            return new NextResponse("unauthorized",{status:401});
          }
          const orders = await prisma.order.findUnique({
            where:{
              id:Number(params.orderId),
              userId:user.id
            },
            include:{
              items:{
                include:{
                  product:{
                    include:{
                      category:true,
                    }
                  }
                }
              }
            }
          });
          return NextResponse.json(orders,{status:200});
    }catch(error:any){
      return new NextResponse("Internal server error", { status: 500 });
    }
    }
