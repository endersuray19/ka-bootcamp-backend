import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export async function middleware(request:NextRequest){
    const token = request.cookies.get("token")?.value;
    // if(!token){
    //     // return NextResponse.redirect(new URL("/auth/signin",request.url))
    // }
    // else{
        return NextResponse.next(); 
    //}
   
}
export const config ={
    matcher:["/"],
}