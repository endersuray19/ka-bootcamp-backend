import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CategoryForm from "../_components/form";

export default function CategoryCreatePage() {
  return (
    <div>
      <Breadcrumb pageName="Category Create" />

      <CategoryForm />
    </div>
  );
}
