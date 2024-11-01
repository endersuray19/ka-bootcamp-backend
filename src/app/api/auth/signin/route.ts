import prisma from "@/lib/prisma";
import { userSignInSchema } from "@/schema/user";
import { NextResponse } from "next/server";
import {compareSync, hashSync} from"bcrypt";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SignJWT } from "jose";

export async function  POST(request:Request) {
    try{
        const body = await request.json();
        userSignInSchema.parse(body);
        
        const user = await prisma.user.findFirst({
            where:{
                email:body.email,
            }
        })
        if(!user){
            return new NextResponse("user not found",{status:404});
        }
        if(user.roles != "ADMIN"){
            return new NextResponse("your not admin",{status:401});
        }
        const{password,...props} = user;
        if(!compareSync(body.password,password)){
            return new NextResponse("your not autorizze this",{status:401});
        }
        
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({
            userId:user?.id,
            email:user?.email,
        })
        .setProtectedHeader({alg:"HS256"})
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secret);
        return NextResponse.json({...props,token},{status:200});
    }
    
    catch(err:any){
            console.log(err);
            return new NextResponse("internal server error",{status:500});
    
    }
}