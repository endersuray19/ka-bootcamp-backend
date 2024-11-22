import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import { Package } from "@/types/package";
import dayjs from "dayjs";
import Link from "next/link";
import Swal from "sweetalert2";
import DeleteCategories from "./_component/form";
import ActionForm from "./_component/formAction";
import Form from "./_component/form";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Category",
  description:"Dashboard"
}



export default async function Categories(){
    
    const categories = await prisma.category.findMany();     
    console.log(categories);
 
    return(
        <div>
            <Breadcrumb pageName="Categories" />
            


    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <Link className="bg-primary text-white px-4 py-2 mb-3 inline-block rounded-md" href="/categories/create">
       Add Category
        </Link>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Created date
              </th>
              
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {category.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {dayjs(category.createdAt).format("DD MMMM YYYY")}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </div>
    )
}