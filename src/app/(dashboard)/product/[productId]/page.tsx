
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Form from "../_components/form"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation";

export default async function UpdateProductPage({params}:{params:{productId:string}}){
    const categories = await prisma.category.findMany({
        where:{
            isActive:true
        }
    });
    const product = await prisma.product.findUnique({
        where:{
            id:Number(params.productId)
        }
    });
    const series = await prisma.serie.findMany();
    const manufactures = await prisma.manufacture.findMany();
    if(!product){
        return notFound();
    }
    return (
        <div>
        <Breadcrumb pageName="Update Product" />
        <Form 
          categories={categories} 
          series={series} 
          manufactures={manufactures}
          product={product}
        />
        {/* <FormTradisional/> */}
    </div>
    )
   
}

    

    
