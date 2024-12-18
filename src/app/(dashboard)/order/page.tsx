import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import Link from "next/link";
import { Metadata } from "next";
import { useSearchParams } from 'next/navigation';
export const metadata:Metadata = {
  title:"Order ",
  description:"Dashboard Order"
}
export default async function OrderPage({searchParams}:{searchParams:{page?:string}}){
  const page = parseInt(searchParams.page || "1",10);
  const itemPerPage = 10;
    const orders = await prisma.order.findMany({
        include:{
            user:true,
        },
        orderBy:{
          createdAt:"desc",
        },
        take:itemPerPage,
        skip:(page-1)*itemPerPage,
        
    });

console.log(orders);
    return (
        <div>
        <Breadcrumb pageName="Order" />
<div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    {/* <Link className="bg-primary text-white px-4 py-2 mb-3 inline-block rounded-md" href="/us/create">
   Add Users
    </Link> */}
  <div className="max-w-full overflow-x-auto ">
    <table className="w-full table-auto ">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[150px] px-4 py-4  font-medium text-black dark:text-white ">
            Names
          </th>
          <th className="min-w-[200px] px-4 py-4  font-medium text-black dark:text-white ">
            Address
          </th>
          <th className="min-w-[80px] px-4 py-4  font-medium text-black dark:text-white ">
            City
          </th>
          <th className="min-w-[80px] px-4 py-4  font-medium text-black dark:text-white ">
            Country
          </th>
          <th className="min-w-[150px] px-4 py-4  font-medium text-black dark:text-white ">
            Postal Code
          </th>
          <th className="min-w-[150px] px-4 py-4  font-medium text-black dark:text-white">
            Created date
          </th>
          <th className="min-w-[30px] px-4 py-4  font-medium text-black dark:text-white">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, key) => (
          <tr key={key} className="text-left">
            <td className="border-b border-[#eee] px-4 py-2  dark:border-strokedark ">
              <h5 className="font-medium text-black dark:text-white">
                {order.user.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
              <h5 className="font-medium text-black dark:text-white">
              {order.address}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
              <h5 className="font-medium text-black dark:text-white">
              {order.city}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
              <h5 className="font-medium text-black dark:text-white">
              {order.country}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
              <h5 className="font-medium text-black dark:text-white">
              {order.postalCode}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
            <h5 className="font-medium text-black dark:text-white">
                {dayjs(order.createdAt).format("DD MMMM YYYY")}
                </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link href={`/order/${order.id}`} className="hover:text-primary">
              
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
                    </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="flex justify-between items-center px-4 py-4">
                    <Link
                        href={`?page=${page - 1}`}
                        className={`${
                            page === 1 ? "pointer-events-none opacity-50" : ""
                        } text-primary`}
                    >
                        Previous
                    </Link>
                    <Link href={`?page=${page + 1}`} className="text-primary">
                        Next
                    </Link>
                </div>
</div>
</div>
)
    
}
