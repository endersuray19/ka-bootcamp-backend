

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {notFound, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "../_component/form";
import prisma from "@/lib/prisma";
import React from "react";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Update Manufacture  ",
  description:"Update a Manufacture"
}
export default async function manufactureDetailId({params,}:{params:{manufactureId:string}}    ){ 
    const manufacture = await prisma.manufacture.findFirst({
        where:{
            id:Number(params.manufactureId)
        }
    })
   if(!manufacture){
    return notFound();
   }
    return(
        <div>
            <Breadcrumb pageName="Update Manufacture" />
            <Form manufacture={manufacture}/>
        </div>
    )
}