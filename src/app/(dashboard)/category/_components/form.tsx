"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CategoryForm({ data }: { data?: Category }) {
  const [name, setName] = useState(data?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);

    try {
      event.preventDefault();

      const fetchData = data
        ? axios.patch(`/api/categories/${data.id}`, {
            name: name,
          })
        : axios.post(`/api/categories`, {
            name: name,
          });

      await toast.promise(fetchData, {
        loading: "Loading",
        success: data ? "Update category success" : "Create category success",
        error: "Internal server error",
      });

      router.push("/category");
      router.refresh();
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Form</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Name <span className="text-meta-1">*</span>
              </label>
              <input
                disabled={isLoading}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter name category"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <Button
              disabled={isLoading}
              type={"submit"}
              text="Submit"
              style="bg-primary w-full text-white rounded py-3 text-center hover:bg-opacity-90"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
