"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoryTable({ data }: { data: Category[] }) {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const deleteCategory = async (id: number) => {
    setIsLoading(true);

    try {
      await toast.promise(axios.delete(`/api/categories/${id}`), {
        error: "Internal server error",
        loading: "Loading",
        success: "Success delete category",
      });

      router.refresh();
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data
        </h4>
        <Button
          disabled={isloading}
          onClick={() => router.push("/category/create")}
          icon={<Plus size={18} />}
          text="Create Category"
          style="bg-primary text-white rounded hover:bg-opacity-90"
        />
      </div>

      <div className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Created At</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {data.map((category, key) => (
        <div
          className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {category.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {category.createdAt.toDateString()}
            </p>
          </div>
          <div className="col-span-1 flex gap-2">
            <Button
              disabled={isloading}
              onClick={() => router.push(`/category/${category.id}`)}
              icon={<Pencil size={18} />}
              text="Edit"
              style="bg-meta-3 hover:bg-opacity-90 text-white rounded text-sm"
            />
            <Button
              onClick={() => deleteCategory(category.id)}
              disabled={isloading}
              icon={<Trash2 size={18} />}
              text="Delete"
              style="bg-danger hover:bg-opacity-90 text-white rounded text-sm"
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center justify-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-base text-black dark:text-white">No Data</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
