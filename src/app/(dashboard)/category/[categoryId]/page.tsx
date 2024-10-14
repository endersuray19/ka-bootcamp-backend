import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CategoryForm from "../_components/form";
import prisma from "@/lib/prisma";

export default async function CategoryEditPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await prisma.category.findFirst({
    where: {
      id: Number(params.categoryId),
    },
  });

  return (
    <div>
      <Breadcrumb pageName="Category Edit" />

      <CategoryForm data={category} />
    </div>
  );
}
