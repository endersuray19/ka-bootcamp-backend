import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import ProductTable from "./_components/table";

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      colors: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <>
      <Breadcrumb pageName="Product" />

      <ProductTable products={products} />
    </>
  );
}
