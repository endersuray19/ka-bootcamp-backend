"use server";

import prisma from "@/lib/prisma";
import { userSignInSchema } from "@/schema/user";
import { compareSync } from "bcrypt";
import { SignJWT } from "jose";
import { ZodError } from "zod";
import {cookies} from 'next/headers';
import { categorySchema } from "./schema/category";
export async function signIn(formData: FormData) {
  try {
    // Tangkap data dari request
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validasi data dari request
    userSignInSchema.parse(body);

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: {
        email: body.email as string,
      },
    });

    // Cek apakah user ada didalam database
    if (!user) {
      throw new Error("Email or password is wrong");
    }

    if (user?.roles !== "ADMIN") {
      throw new Error("You are not authorized to access this resource");
    }

    if (!compareSync(body.password as string, user.password)) {
      throw new Error("Email or password is wrong");
    }

    // Membuat secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    const { password, ...props } = user;

    cookies().set("token",token);
    return { token };
  } catch (err: any) {
    console.log(err);
    if (err instanceof ZodError) {
      return { error: "Please insert a correct data" };
    } else {
      return { error: err?.message || "Internal server error" };
    }
  }
}
export async function signOut(){
  cookies().delete("token");
  return { success: "Sign out success" };
}
export async function createCategory(formData: FormData){
  try{
    const body = {
      name: formData.get("name"),
      isActive: formData.get("isActive"),
      description: formData.get("description"),
    }
    console.log(body);
    categorySchema.parse(body);
    const category = await prisma.category.create({
      data:{
        name: body.name as string,
        isActive: body.isActive === "1" ? true : false,
        description: body.description as string,
      }
    })
    return { success: "Category created successfully" };
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
export async function updateCategory(formData: FormData) {
  try {
    const body = {
      id: parseInt(formData.get("id") as string), // Ensure the id is correctly parsed
      name: formData.get("name"),
      isActive: formData.get("isActive"),
      description: formData.get("description"),
    };

    console.log(body); // Check if the id is being passed

    // Validate with your schema
    categorySchema.parse(body);

    // Update the category using the id
    const category = await prisma.category.update({
      where: {
        id: body.id, // Ensure the id is being used correctly
      },
      data: {
        name: body.name as string,
        isActive: body.isActive === "1" ? true : false,
        description: body.description as string,
      },
    });

    return { success: "Category updated successfully" };
  } catch (err: any) {
    console.log(err);
    if (err instanceof ZodError) {
      return { success: false, error: "Please insert a correct data" };
    } else {
      return { success: false, error: err?.message || "Internal server error" };
    }
  }
}
export async function deleteCategory(id: string){
  try{
  const category = await prisma.category.delete({
    where:{
      id:parseInt(id)
    }
  })
    return { success: "Category deleted successfully", data: category };
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