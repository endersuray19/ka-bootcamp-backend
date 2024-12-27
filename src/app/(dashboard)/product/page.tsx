import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ActionForm from "./_components/formAction";
import dayjs from "dayjs";
export const revalidate = 10;
export const metadata: Metadata = {
  title: "Product",
  description: "Dashboard",
};

export default async function Product({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 10;

  const products = await prisma.product.findMany({
    include: {
      category: true,
      serie: true,
      manufacture: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <Link
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition duration-200"
          href="/product/create"
        >
          Add Product
        </Link>
      </div>

      <div className="rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="px-8 py-6">
          <h4 className="text-2xl font-semibold text-black dark:text-white">
            Product List
          </h4>
        </div>

        <table className="min-w-full table-auto border-collapse border border-stroke dark:border-strokedark">
          <thead className="bg-gray-200 dark:bg-meta-4">
            <tr>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark">
                <span className="font-medium text-black dark:text-white">
                  Product Name
                </span>
              </th>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark">
                <span className="font-medium text-black dark:text-white">
                  Category
                </span>
              </th>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark">
                <span className="font-medium text-black dark:text-white">
                  Serie
                </span>
              </th>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark">
                <span className="font-medium text-black dark:text-white">
                  Manufacture
                </span>
              </th>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark">
                <span className="font-medium text-black dark:text-white">
                  Price
                </span>
              </th>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark">
                <span className="font-medium text-black dark:text-white">
                  Stock
                </span>
              </th>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark whitespace-nowrap">
  <span className="font-medium text-black dark:text-white">
    Created At
  </span>
</th>
              <th className="px-6 py-3 border-b border-stroke dark:border-strokedark">
                <span className="font-medium text-black dark:text-white">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, key) => (
              <tr key={key}>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="h-12 w-12 rounded-md"
                      src={`${process.env.SUPABASE_PUBLIC_IMAGE}/${(product.images as string[])[0]}`}
                      alt="Product"
                      width={50}
                      height={50}
                    />
                    <p className="text-sm text-black dark:text-white">
                      {product.title}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                  <p className="text-sm text-black dark:text-white">
                    {product.category.name}
                  </p>
                </td>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                  <p className="text-sm text-black dark:text-white">
                    {product.serie.name}
                  </p>
                </td>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                  <p className="text-sm text-meta-3">{product.manufacture.name}</p>
                </td>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark whitespace-nowrap">
                  <p className="text-sm text-black dark:text-white">
                    Rp. {product.price.toLocaleString("id-ID")}.00
                  </p>
                </td>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                  <p className="text-sm text-black dark:text-white">{product.stock}</p>
                </td>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
                  <p className="text-sm text-black dark:text-white">
                    {product.createdAt
                      ? dayjs(product.createdAt).format("DD/MM/YYYY")
                      : " "}
                  </p>
                </td>
                <td className="px-6 py-4 border-b border-stroke dark:border-strokedark">
  <div className="flex items-center space-x-2">
    <Link
      href={`/product/${product.id}`}
      
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 18"
      >
        <path
          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
          fill="currentColor"
        />
        <path
          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
          fill="currentColor"
        />
      </svg>
    </Link>
    <ActionForm productId={product.id.toString()} />
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-black dark:text-white">
              Showing {(page - 1) * itemsPerPage + 1} to{" "}
              {Math.min(page * itemsPerPage, products.length)} of{" "}
              {products.length} Products
            </p>
            <div className="flex items-center space-x-3">
              <Link
                href={`?page=${page - 1}`}
                className={`px-4 py-2 rounded-lg ${
                  page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:text-primary-dark"
                }`}
              >
                Previous
              </Link>
              <Link
                href={`?page=${page + 1}`}
                className={`px-4 py-2 rounded-lg ${
                  page * itemsPerPage >= products.length
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:text-primary-dark"
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
