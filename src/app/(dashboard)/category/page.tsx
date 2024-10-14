import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CategoryTable from "@/app/(dashboard)/category/_components/table";
import prisma from "@/lib/prisma";

export default async function CategoryPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <>
      <Breadcrumb pageName="Category" />
      <CategoryTable data={categories} />
    </>
  );
}
