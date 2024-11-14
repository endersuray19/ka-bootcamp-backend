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


export async function  createProduct(formData:FormData) {
    try{
        const body={
            title: formData.get("title"),
            price: formData.get("price") ? Number(formData.get("price")):0,
            description: formData.get("description"),
            categoryId: formData.get("categoryId")? Number(formData.get("categoryId")):0,
            serieId: formData.get("serieId")? Number(formData.get("serieId")):0,
            manufactureId: formData.get("manufactureId") ? Number(formData.get("manufactureId")):0,
            image: ["https://projectsekai.fandom.com/wiki/Otori_Emu/Cards?file=Operation_Smile_Was_a_Great_Success%21_T.png","https://projectsekai.fandom.com/wiki/Otori_Emu/Cards?file=Operation_Smile_Was_a_Great_Success%21_T.png"],
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
export async function  updateProduct(formData:FormData,id:string) {
    try{
        const body={
            title: formData.get("title"),
            price: formData.get("price") ? Number(formData.get("price")):0,
            description: formData.get("description"),
            categoryId: formData.get("categoryId")? Number(formData.get("categoryId")):0,
            serieId: formData.get("serieId")? Number(formData.get("serieId")):0,
            manufactureId: formData.get("manufactureId") ? Number(formData.get("manufactureId")):0,
            image: ["https://down-id.img.susercontent.com/file/db87ae88fc6378abee2f5231b8a2b0d6.webp","https://down-id.img.susercontent.com/file/9e133d4c7963a3b2d1e018753f353e21.webp","https://down-id.img.susercontent.com/file/b2a9e48b9d0bbe7585b5afc6b2eb6cbe.webp","https://down-id.img.susercontent.com/file/d9f7b975ebd3f5f5dbfebb88ae386659.webp"],
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

