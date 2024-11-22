import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import { Package } from "@/types/package";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import ActionForm from "./_components/formAction";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Product",
  description:"Dashboard"
}
export default async function Product(){
    const products = await prisma.product.findMany({
        include:{
            category:true,
            serie:true,
            manufacture:true,
        }
});
   
    console.log(products);
    return(
        <div>
             <Link className="bg-primary text-white px-4 py-2 mb-3 inline-block rounded-md" href="/product/create">
       Add Product
        </Link>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Serie</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Manufacture</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {products.map((product, key) => (
        <div
         className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={`${process.env.SUPABASE_PUBLIC_IMAGE}/${(product.images as string[])[0]}`}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.title}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.serie.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product.manufacture.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              Rp. {product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.stock}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
          <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
          </Link>
          <ActionForm productId={product.id.toString()}/>
          </div>
        </div>
        
      ))}
    </div>
    
        </div>
    )
}