"use server";

import prisma from "@/lib/prisma";
import { userSignInSchema } from "@/schema/user";
import { compareSync } from "bcrypt";
import { SignJWT } from "jose";
import { ZodError } from "zod";
import {cookies} from 'next/headers';
import { categorySchema } from "@/schema/category";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/schema/product";
import { error } from "console";


export async function  createProduct(formData:FormData, images:string[]) {
    try{
        const body={
            title: formData.get("title"),
            price: formData.get("price") ? Number(formData.get("price")):0,
            description: formData.get("description"),
            categoryId: formData.get("categoryId")? Number(formData.get("categoryId")):0,
            serieId: formData.get("serieId")? Number(formData.get("serieId")):0,
            manufactureId: formData.get("manufactureId") ? Number(formData.get("manufactureId")):0,
            image: images,
            stock: formData.get("stock")? Number(formData.get("stock")):0,
            
        }
        productSchema.parse(body);
        const product = await prisma.product.create({
            data:{
                title: body.title as string,
                price: body.price,
                description: body.description as string,
                categoryId: body.categoryId,
                serieId: body.serieId,
                manufactureId: body.manufactureId,
                images: body.image,
                stock:Number(body.stock),
            }
        })
        return {success:"Product created successfully"}
    }
    catch(err:any){
        console.log(err);
        if(err instanceof ZodError){
            return{success:false,error:"Please inser a correct data"}
        }else{
            return{success:false,error:err?.message||"internet server error"}
        }
    }
    
}
export async function  updateProduct(formData:FormData,id:string,images:string[]) {
    try{
        const body={
            title: formData.get("title"),
            price: formData.get("price") ? Number(formData.get("price")):0,
            description: formData.get("description"),
            categoryId: formData.get("categoryId")? Number(formData.get("categoryId")):0,
            serieId: formData.get("serieId")? Number(formData.get("serieId")):0,
            manufactureId: formData.get("manufactureId") ? Number(formData.get("manufactureId")):0,
            image: images,
            stock: formData.get("stock")? Number(formData.get("stock")):0,
            
        }
        productSchema.parse(body);
        const product = await prisma.product.update({
            where:{
                id:Number(id),
            },
            data:{
                title: body.title as string,
                price: body.price,
                description: body.description as string,
                categoryId: body.categoryId,
                serieId: body.serieId,
                manufactureId: body.manufactureId,
                images: body.image,
                stock:Number(body.stock),
            }
        })
        revalidatePath("/product");
        return {success:true,data:product}
    }
    catch(err:any){
        console.log(err);
        if(err instanceof ZodError){
            return{success:false,error:"Please inser a correct data"}
        }else{
            return{success:false,error:err?.message||"internet server error"}
        }
    }
    
}
export async function deleteProduct(productId:string){
    try{
        const product = await prisma.product.delete({
            where:{id:Number(productId)}
        })
        revalidatePath("/product");
        return {success:true,data:product}
    }
    catch(err:any){
        console.log(err);
        if(err instanceof ZodError){
            return{success:false,error:"Please inser a correct data"}
        }else{
            return{success:false,error:err?.message||"internet server error"}
        }
    }
}

