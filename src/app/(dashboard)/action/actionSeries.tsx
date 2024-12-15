"use server";

import prisma from "@/lib/prisma";
import { userSignInSchema } from "@/schema/user";
import { compareSync } from "bcrypt";
import { SignJWT } from "jose";
import { ZodError } from "zod";
import {cookies} from 'next/headers';
import { serieSchema } from "@/schema/serie";
import { revalidatePath } from "next/cache";
export async function createSeries(formData:FormData, images:string[]){
    try{
        const body={
            name:formData.get("name"),
            isActive:formData.get("isActive"),
            description:formData.get("description"),
            image: images,
        }
        serieSchema.parse(body);
        const serie = await prisma.serie.create({
            data:{
                name:body.name as string,
                isActive:body.isActive === "1" ? true :false,
                description:body.description as string,
                images: body.image,
            }
        })
        revalidatePath("/series");
        return {success:true,message:"Serie created successfully"};
    }
    catch(err: any){
        console.log(err);
        if (err instanceof ZodError) {
            return { success: false, error: "Please insert a correct data" };
          } else {
            return { success: false, error: err?.message || "Internal server error" };
          } 
    }
    
}
export async function updateSeries (formData:FormData, id:string,images:string[]){
    try{
        const body={
            name:formData.get("name"),
            isActive:formData.get("isActive"),
            description:formData.get("description"),
            image: images,
        }
        serieSchema.parse(body);
        const serie = await prisma.serie.update({
            where:{
                id:Number(id)
            },
            data:{
                name:body.name as string,
                isActive:body.isActive === "1" ? true :false,
                description:body.description as string,
                images: body.image,
            }
        })
        revalidatePath("/series");
        return { success: true,data:serie };
  } catch (err: any) {
    console.log(err);
    if (err instanceof ZodError) {
      return { success: false, error: "Please insert a correct data" };
    } else {
      return { success: false, error: err?.message || "Internal server error" };
    }
    }
}
export async function deleteSerie(id: string){
    try{
    const serie = await prisma.serie.delete({
      where:{
        id:parseInt(id)
      }
    })
      return { success: true, data: serie };
    }
    catch(err:any){
      console.log(err);
      if(err instanceof ZodError){
        return { success: false, error: "Please insert a correct data" };
      }else{
        return { success: false, error: err?.message || "Internal server error" };
      } 
    }
  }