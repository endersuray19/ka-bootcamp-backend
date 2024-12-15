

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {notFound, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "../_component/form";
import prisma from "@/lib/prisma";
import React from "react";
import { Metadata } from "next";
export const metadata:Metadata = {
    title:"Update Serie",
    description:"update a Serie"
  }
export default async function SerieDetailId({params,}:{params:{serieId:string}}    ){ 
    const serie = await prisma.serie.findFirst({
        where:{
            id:Number(params.serieId)
        }
    })
   if(!serie){
    return notFound();
   }
    return(
        <div>
            <Breadcrumb pageName="Update Serie" />
            <Form serie={serie}/>
        </div>
    )
}