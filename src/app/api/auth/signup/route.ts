import prisma from "@/lib/prisma";
import { userSignUpSchema } from "@/schema/user";
import { NextResponse } from "next/server";
import {hashSync} from"bcrypt";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function  POST(request:Request) {
    try{
        const body = await request.json();
        userSignUpSchema.parse(body);
        const{name, email, password, phoneNumber,roles} = body;
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashSync(password,10),
                phoneNumber,
                roles,
            }
        })
        if(!user){
            return new NextResponse("user not found",{status:404})
        }
        const{password:newPassword,...props} = user;
        return NextResponse.json({
            data:props,
            success:true,
            message:"success",
        },{
            status:200
        })
    }
    catch(err:any){
        if( err instanceof ZodError){
            return NextResponse.json(err.issues[0])
        }else if( err instanceof PrismaClientKnownRequestError){
            return new NextResponse("Email has already been registered")
        }else{
            return new NextResponse("internal server error",{status:500});
        }
    }
}