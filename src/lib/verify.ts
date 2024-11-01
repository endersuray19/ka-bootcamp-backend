import { jwtVerify } from "jose";
import db from"@/lib/prisma";
export async function verifyUser(request:Request) {
    try{
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        if(!token){
            return null;
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload} = await jwtVerify(token,secret);
        const user = await db.user.findFirstOrThrow({
            where:{
                id:payload.userId as number,
            }
        })
        return user;
    }
    catch{

    }
    
}