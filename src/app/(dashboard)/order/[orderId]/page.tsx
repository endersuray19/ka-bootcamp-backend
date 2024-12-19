
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
   const totalItem= order.items.reduce((total,item)=>total +item.quantity,0);
   const totalPrice = order.items.reduce((total,item)=> total + item.quantity * item.product.price,0)
    return(
        <div>
                <Breadcrumb pageName="Detail Order" />
                <div className="max-w-full overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white ">
            Name
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
            Address
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
            Country
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
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
       
          <tr className="bg-gray-2 text-left dark:bg-[#24303F]">
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
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
            {order.city}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
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
      <thead className="bg-white">
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white ">
            Title
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
            Category
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
            Manufacture
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white ">
            Series
          </th>
          <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
            Quantity
          </th>
          <th className="min-w-[250px] px-4 py-4 font-medium text-black dark:text-white">
            Price
          </th>
         
        </tr>
      </thead>
      <tbody className="bg-white" >
      {order.items.map((item,index)=>(
          <tr key={index} className="bg-gray-2 text-left dark:bg-[#24303F]">
            <td className="border-b border-[#eee] flex px-4 py-5  dark:border-strokedark " >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <Image
                className="hover:scale-100 translate-x-2"
                  src={`${process.env.SUPABASE_PUBLIC_IMAGE}/${(item.product.images as string[])[0]}`}
                  width={60}
                  height={50}
                  alt="Product"
                />
              <h5 className="ml-5 font-medium text-black  dark:text-white">
              <h1>{item.product.title}</h1>
              </h5>
              </div>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
              <h5 className="font-medium text-black  dark:text-white">
              {item.product.category.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
              <h5 className="font-medium text-black  dark:text-white">
              {item.product.manufacture.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
            <h5 className="font-medium text-black  dark:text-white">
            {item.product.serie.name}
            </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
             <h5 className="font-medium text-black  dark:text-white">
             {item.quantity}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark ">
             <h5 className="font-medium text-black  dark:text-white">
             Rp {item.product.price.toLocaleString("id-ID")}.00
              </h5>
            </td>
          </tr>
         ))}
         <tr className=" bg-gray-2 text-left text-black dark:bg-[#24303F]">
         
          <td className="border-b border-[#eee] px-4 py-5  dark:border-strokedark dark:text-white" colSpan={4}>
            Total
          </td>

          <td className=" border-b border-[#eee] px-4 py-5  dark:border-strokedark dark:text-white">
            {totalItem}
          </td>
          
          <td className=" border-b border-[#eee] px-4 py-5  dark:border-strokedark dark:text-white">
          Rp  {totalPrice.toLocaleString("id-ID")}.00
          </td>
         
         </tr>
         <tr className="bg-gray-2 text-left dark:bg-[#24303F] text-black">
          <td colSpan={5} className="border-b border-[#eee] px-4 py-5  dark:border-strokedark dark:text-white"></td>
          <td className="border-[#eee] px-4 py-5  dark:border-strokedark dark:text-white">Rp {(totalItem * totalPrice).toLocaleString("id-ID")}.00</td>
         </tr>
      </tbody>
    </table>
  </div>
               
                 
               
        </div>
    )
}