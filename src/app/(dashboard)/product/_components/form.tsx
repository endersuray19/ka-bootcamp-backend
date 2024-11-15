'use client';

import { createProduct, updateProduct } from "@/app/actionProduct";
import { Category, Manufacture, Product, Serie } from "@prisma/client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface FormProductProps{
    categories:Category[],
    series:Serie[],
    manufactures:Manufacture[],
    product?:Product,
}
export default function Form({categories,series,manufactures,product}:FormProductProps){
  const [images,setImages] = useState<string[]>([]);
  const [loading,setLoading] = useState(false);
  const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
       event.preventDefault();
       setLoading(true);
       const formData = new FormData(event.currentTarget as HTMLFormElement);
       const result = product ? await updateProduct (formData,product.id.toString()) : await createProduct(formData);
       setLoading(false);
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
          text:product ? "Product updated successfully":"Category created successfully",
        })
        router.push('/product');
       }
       
    }
    async function handleUploadImages(
      event: React.ChangeEvent<HTMLInputElement>,
    ) {
      try {
        const files = event.target.files ? Array.from(event.target.files) : [];
        console.log("array", files);
  
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });
  
        const { data } = await axios.post("/api/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("data",data);
        setImages([...images, ...data.uploadedFiles]);
  
        toast.success("Upload file success");
      } catch (err: any) {
        console.log(err);
      }
    }
    return(
        <div>
          <div className=" grid grid-cols-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Product
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title Product
                  </label>
                  <input
                    defaultValue={product?.title}
                    name="title"
                    required
                    type="text"
                    placeholder="Enter Category Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Category
                  </label>
                <select  name="categoryId"
            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent pl-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
            >
           
           {categories.map((category)=>(
            <option className="text-body dark:text-bodydark" key={category.id} value={category.id}>{category.name}</option>
           ))}
            </select>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Serie
                  </label>
                <select  name="serieId"
            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent pl-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
            >
           
           {series.map((serie)=>(
            <option className="text-body dark:text-bodydark" key={serie.id} value={serie.id}>{serie.name}</option>
           ))}
            </select>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Manufacture
                  </label>
                <select  name="manufactureId"
            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent pl-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
            >
           
           {manufactures.map((manufacture)=>(
            <option className="text-body dark:text-bodydark" key={manufacture.id} value={manufacture.id}>{manufacture.name}</option>
           ))}
            </select>
                <div className="mb-6">
                 
                  <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Price
                  </label>
                  <input
                    defaultValue={product?.price}
                    name="price"
                    required
                    type="number"
                    placeholder="Enter Category Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Stock
                  </label>
                  <input
                    defaultValue={product?.stock ? product.stock.toString() : ""}
                    name="stock"
                    required
                    type="number"
                    placeholder="Enter Category Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea 
                    defaultValue={product?.description||""}
                    name="description"
                    rows={6}
                    placeholder="Type your descr"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  onChange={handleUploadImages}
                  multiple
                  accept="image/*"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
                <button type="submit" className="flex mt-5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  {loading ? "Submitting..." : "SUBMIT"}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
        
    )
}