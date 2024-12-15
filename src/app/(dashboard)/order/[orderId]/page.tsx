
import { createCategory } from "@/app/auth/_components/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {notFound, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import prisma from "@/lib/prisma";
import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Order Detail",
  description:"Detail from Order"
}
export default async function OrderItemId({params,}:{params:{orderId:string}}    ){ 
    const order = await prisma.order.findUnique({
        where:{
            id:Number(params.orderId)
        },
        include:{
            user:true,
            items:{
                include:{
                    product:{
                        include:{
                            category:true,
                            manufacture:true,
                            serie:true
                        }
                    }
                }
            },  
        }
    })
   if(!order){
    return notFound();
   }
    return(
        <div>
                <Breadcrumb pageName="Detail Order" />
                <div className="max-w-full overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Name
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Address
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Country
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Postal Code
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
            City
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
          Created date
          </th>
        </tr>
      </thead>
      <tbody>
       
          <tr >
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {order.user.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
              {order.address}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
              {order.country}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
            <h5 className="font-medium text-black dark:text-white">
            {order.postalCode}
            </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
             <h5 className="font-medium text-black dark:text-white">
            {order.city}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
            <h5 className="font-medium text-black dark:text-white">
                {dayjs(order.createdAt).format("DD MMMM YYYY")}
                </h5>
            </td>
           
          </tr>
        
      </tbody>
    </table>
  </div>
  <div className="max-w-full overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Title
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Category
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Manufacture
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Series
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
            Quantity
          </th>
         
        </tr>
      </thead>
      <tbody>
      {order.items.map((item,index)=>(
          <tr key={index}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11" >
            
              <h5 className="font-medium text-black dark:text-white">
              <h1>{item.product.title}</h1>
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
              {item.product.category.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
              {item.product.manufacture.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
            <h5 className="font-medium text-black dark:text-white">
            {item.product.serie.name}
            </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
             <h5 className="font-medium text-black dark:text-white">
             {item.quantity}
              </h5>
            </td>
           
          </tr>
         ))}
      </tbody>
    </table>
  </div>
               
                 
               
        </div>
    )
}