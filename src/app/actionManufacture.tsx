"use server"
import prisma from "@/lib/prisma";
import { userSignInSchema } from "@/schema/user";
import { compareSync } from "bcrypt";
import { SignJWT } from "jose";
import { ZodError } from "zod";
import {cookies} from 'next/headers';
import { revalidatePath } from "next/cache";
import { manufactureSchema } from "@/schema/manufacture";

export async function createmanufacture(formData: FormData){
    try{
      const body = {
        name: formData.get("name"),
        description: formData.get("description"),
      }
      console.log(body);
      manufactureSchema.parse(body);
      const manufacture = await prisma.manufacture.create({
        data:{
          name: body.name as string,
          description: body.description as string,
        }
      })
      return {success:true,message:"man created successfully"};
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
  
export async function updateManufacture(formData: FormData, id:string) {
    try {
      const body = {
        name: formData.get("name"),
        description: formData.get("description"),
      };
  
      console.log(body); // Check if the id is being passed
  
      // Validate with your schema
      manufactureSchema.parse(body);
  
      // Update the manufacture using the id
      const manufacture = await prisma.manufacture.update({
        where: {
          id: Number(id), // Ensure the id is being used correctly
        },
        data: {
          name: body.name as string,
          description: body.description as string,
        },
      });
      revalidatePath("/manufactures");
      return { success: true,data:manufacture };
    } catch (err: any) {
      console.log(err);
      if (err instanceof ZodError) {
        return { success: false, error: "Please insert a correct data" };
      } else {
        return { success: false, error: err?.message || "Internal server error" };
      }
    }
  }
  export async function deleteManufacture(id: string){
    try{
    const manufacture = await prisma.manufacture.delete({
      where:{
        id:parseInt(id)
      }
    })
      return { success: true, data: manufacture };
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