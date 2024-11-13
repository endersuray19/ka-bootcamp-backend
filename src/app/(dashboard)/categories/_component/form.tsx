"use client"

import Swal from "sweetalert2";
import { createCategory, updateCategory } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

interface ActionFormProps {
  category?: Category;
}

export default function Form({category}:ActionFormProps){
  const router = useRouter();

  const handleSubmit = async (formData:FormData)=>{
    const result = category ? await updateCategory(formData,category.id.toString()): await createCategory(formData);
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
        text:category ? "Category updated successfully":"Category created successfully",
      })
      router.push('/categories');
     }
  }
  return( 
    
    <div>
            
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">
        Sign In Form
      </h3>
    </div>
    <form action={handleSubmit}>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Name Category
          </label>
          <input
            name="name"
            defaultValue={category?.name}
            type="text"
            placeholder="Enter Category Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Active
          </label>
        <select name="isActive"
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
          <textarea
          defaultValue={category?.description||""}
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