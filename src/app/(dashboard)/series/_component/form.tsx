"use client"

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Serie } from "@prisma/client";
import { useState } from "react";
import { updateSeries, createSeries } from "../../action/actionSeries";

interface ActionFormProps{
    serie?:Serie;
}
export default function Form({serie}:ActionFormProps){
    const [loading,setLoading] = useState(false);
    const router = useRouter();
const handleSubmit = async(formdata: FormData)=>{
    const result = serie ? await updateSeries(formdata,serie.id.toString()): await createSeries(formdata);
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
          text:serie ? "Serie updated successfully":"Serie created successfully",
        })
        router.push('/series');
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
              Name Serie
            </label>
            <input
            disabled={loading}
              name="name"
              defaultValue={serie?.name}
              type="text"
              placeholder="Enter serie Name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Active
            </label>
          <select disabled={loading} name="isActive"
      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent pl-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
      >
      <option value={1} className="text-body dark:text-bodydark">
          Active
      </option>
      <option value={0} className="text-body dark:text-bodydark">
          Inactive
      </option>
     
      </select>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea disabled={loading}
            defaultValue={serie?.description||""}
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
    
    