import {z} from "zod";

export const userSignUpSchema = z.object({
    name:z.string(),
    email: z.string().email(),
    password:z.string().min(6),
    phoneNumber:z.string(),
    roles:z.enum(["ADMIN","CUSTOMER"]),
}) 
export const userSignInSchema =  z.object({
    email: z.string().email(),
    password:z.string().min(6),
})