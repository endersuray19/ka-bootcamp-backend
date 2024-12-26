import ECommerce from "@/components/Dashboard/E-commerce";
import prisma from "@/lib/prisma";
import { getProfit } from "@/lib/profit";
export const revalidate = 3;
export default async function Home() {
  const categories = await prisma.category.findMany({
    include:{
      products:true
    }
  });
  const products = await prisma.product.findMany({
    include:{
      items:true,
      category:true,
      manufacture:true,
    }
  });
  const orders = await prisma.order.count();
  const customers = await prisma.user.count({
    where: {
      roles: "CUSTOMER",
    }
  })
  const profits = await getProfit();

 
  return (
          
      <ECommerce customers={customers} categories={categories} orders={orders} products={products} profits={profits}/>
  );
}
