"use client"
import {updateCategory } from "@/app/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import Swal from "sweetalert2";
import { ZodError } from "zod";

export default function Form({categoryId}:{categoryId:string}){ 
  const router = useRouter();
    const handleSubmit = async (formData: FormData) => {
        const result = await updateCategory(formData);
        if(!result.success){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.error,
            })
        }
        else{
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Category updated successfully",
            })
            router.push("/categories");
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
            <input
          type="hidden"
          name="id"
          value={categoryId} 
  />
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name categories
                  </label>
                  <input
                    name="name"
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