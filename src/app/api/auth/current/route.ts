import { verifyUser } from "@/lib/verify";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try{
        const user = await verifyUser(request);
        if(!user){
            return NextResponse.json({
                data:null,
                success:false,
                message:"unauthorized user"
            });
        }
        const {password, ...props} = user;
        return NextResponse.json({
            data:user,
            success:true,
            message:"get user success"
        });
    }
    catch(err:any){
        console.log(err);
        return NextResponse.json({
            data:null,
            success:false,
            message: err?.message || "internal server error"
        },{
            status:500
        },)
    };
}