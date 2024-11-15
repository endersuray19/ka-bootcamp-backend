
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Form from "../_components/form"
import prisma from "@/lib/prisma"

export default async function UpdateProductPage({params}:{params:{productId:string}}){
    const categories = await prisma.category.findMany({
        where:{
            isActive:true
        }
    });
    const product = await prisma.product.findFirst({
        where:{
            id:Number(params.productId)
        }
    });
    const series = await prisma.serie.findMany();
    const manufactures = await prisma.manufacture.findMany();
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

    

    
