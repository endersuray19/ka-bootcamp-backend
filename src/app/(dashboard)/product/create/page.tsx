import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import ProductForm from "../_components/form";

export default async function ProductCreatePage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <Breadcrumb pageName="Create Product" />
      <ProductForm categories={categories} />
    </div>
  );
}
