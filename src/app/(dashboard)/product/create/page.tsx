
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Form from "../_components/form"
import prisma from "@/lib/prisma"
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Create Product",
  description:"create a product"
}
export default async function CreateProductPage(){
    const categories = await prisma.category.findMany({
        where:{
            isActive:true
        }
    });
    const series = await prisma.serie.findMany();
    const manufactures = await prisma.manufacture.findMany();
    return (
        <div>
        <Breadcrumb pageName="Create Product" />
        <Form 
          categories={categories} 
          series={series} 
          manufactures={manufactures}
        />
        {/* <FormTradisional/> */}
    </div>
    )
   
}

    

    
