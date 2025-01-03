
import { createCategory } from "@/app/auth/_components/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {notFound, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "../_component/form";
import prisma from "@/lib/prisma";
import React from "react";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Update Category",
  description:"update a category"
}

export default async function CategoryDetailId({params,}:{params:{categoryId:string}}    ){ 
    const category = await prisma.category.findFirst({
        where:{
            id:Number(params.categoryId)
        }
    })
   if(!category){
    return notFound();
   }
    return(
        <div>
            <Breadcrumb pageName="Edit Category" />
            <Form category={category}/>
        </div>
    )
}