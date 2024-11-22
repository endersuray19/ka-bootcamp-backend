"use client"

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Manufacture, Serie } from "@prisma/client";
import { useState } from "react";
import {  createmanufacture, updateManufacture } from "@/app/actionManufacture";

interface ActionFormProps{
    manufacture?:Manufacture;
}
export default function Form({manufacture}:ActionFormProps){
    const [loading,setLoading] = useState(false);
    const router = useRouter();
const handleSubmit = async(formdata: FormData)=>{
    const result = manufacture ? await updateManufacture(formdata,manufacture.id.toString()): await createmanufacture(formdata);
    if(!result.success){
        Swal.fire({
          icon:'error',
          title:'error',
          text:result.error || "Something went wrong",
          
        })
       }else{
        await Swal.fire({
          icon:'success',
          title:'success',
          text:manufacture ? "Serie updated successfully":"Serie created successfully",
        })
        router.push('/manufactures');
       }
    }
    return( 
      
      <div>
              
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Serie Form
        </h3>
      </div>
      <form action={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Name Manufacture
            </label>
            <input
            disabled={loading}
              name="name"
              defaultValue={manufacture?.name}
              type="text"
              placeholder="Enter manufacture Name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea disabled={loading}
            defaultValue={manufacture?.description||""}
              name="description"
              rows={6}
              placeholder="Type your descr"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <button type="submit" className="flex mt-5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
    )
}
    
    