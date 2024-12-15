"use client"

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Serie } from "@prisma/client";
import { useState } from "react";
import { updateSeries, createSeries } from "../../action/actionSeries";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
interface ActionFormProps{
    serie?:Serie;
}
export default function Form({serie}:ActionFormProps){
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const imagesLocal = JSON.parse(localStorage.getItem("images") || "[]");
    const [images, setImages] = useState<string[]>(() => {
      if (serie?.images) return serie.images;
      return JSON.parse(localStorage.getItem("images") || "[]");
  });
const handleSubmit = async(formdata: FormData)=>{
  setLoading(true);
  Swal.fire({
    title:"Submitting....",
    text:"Please wait while your category is being submitted",
    icon:"info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(); 
    },
  })
    const result = serie ? await updateSeries(formdata,serie.id.toString(), images): await createSeries(formdata, images);
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
        toast.success("serie created successfully");
        router.push('/series');
       }
    }
    async function handleUploadImages(
      event: React.ChangeEvent<HTMLInputElement>,
    ) {
      try {
        Swal.fire({
          title: "Uploading...",
          text: "Please wait while your images are being uploaded",
          icon: "info",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(); 
          },
        })
        const files = event.target.files ? Array.from(event.target.files) : [];
    
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });
    
        const { data } = await axios.post("/api/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        const newImages = [...images, ...data.uploadedFiles];
        setImages(newImages);
    
        
        localStorage.setItem("images", JSON.stringify(newImages));
    
      
        localStorage.removeItem("images");
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "File uploaded successfully",
        })
        toast.success("Upload file success");
      } catch (err: any) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,  
        })
      }
    }
    
  async function handleDeleteImage(filename:string){
    try{
      await axios.delete(`/api/images/${filename}`)
      const newImages = images.filter((image)=>image !==filename);
      setImages(newImages);
      localStorage.setItem("images",JSON.stringify(newImages));
      toast.success("File deleted successfully");
    }
    catch(error){
      console.log(error);
    }
  }
    return( 
      
      <div>
            <div className=" grid grid-cols-2">        
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
              placeholder="Type serie description"
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
            SUBMIT
          </button>
        </div>
      </form>
    </div>
    <div className="grid w-full ml-5 grid-cols-2 gap-2">
        {images.map((image, i) => (
          <div
            key={i}
            className="relative aspect-square rounded bg-white shadow-md"
          >
            <Image 
              src={`${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_IMAGE}/${image}`}
              alt="test"
              fill
              className="object-contain"
            />

            <button onClick={()=>handleDeleteImage(image)} className="absolute -right-4 -top-4 rounded-full bg-red p-3 text-white transition-opacity hover:bg-red/90">
              <X />
            </button>
          </div>
        ))}
      </div>
  </div>
  </div>
    )
}
    
    