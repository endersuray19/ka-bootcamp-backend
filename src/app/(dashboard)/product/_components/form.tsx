"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import axios from "axios";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    company: "",
    categoryId: "",
    description: "",
  });

  const [colors, setColors] = useState([
    {
      id: 1,
      color: "#000000",
      quantity: 1,
    },
  ]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddColor = () => {
    setColors([
      ...colors,
      {
        id: colors.length + 1,
        color: "#000000",
        quantity: 1,
      },
    ]);
  };

  const handleOnChangeColor = (
    i: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const getColors = [...colors];
    getColors[i] = {
      ...getColors[i],
      [event.target.name]: event.target.value,
    };

    setColors(getColors);
  };

  const handleDeleteColor = (i: number) => {
    if (colors.length === 1) {
      toast.error("Please add at least one color!");
      return;
    }

    const getColors = [...colors];
    getColors.splice(i, 1);
    setColors(getColors);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);

    try {
      event.preventDefault();

      await toast.promise(
        axios.post("/api/products", {
          ...form,
          price: Number(form.price),
          categoryId: Number(form.categoryId),
          colors: colors.map((color) => ({
            ...color,
            quantity: Number(color.quantity),
          })),
          images: images,
        }),
        {
          error: "Internal server error",
          loading: "Loading",
          success: "Create product success",
        },
      );

      // router.push("/product");
      // router.refresh();
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files ? Array.from(event.target.files) : [];
      console.log("array", files);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await toast.promise(
        axios.post("/api/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          error: "Internal server error",
          loading: "Loading",
          success: "Upload image success",
        },
      );

      setImages([...images, ...data.uploadedFiles]);

      toast.success("Upload file success");
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleDeleteImage = async (filename: string, index: number) => {
    await toast.promise(axios.delete(`/api/images/${filename}`), {
      error: "Internal server error",
      loading: "Loading",
      success: "Delete success",
    });

    const updatedPreviews = [...images];
    updatedPreviews.splice(index, 1);
    setImages(updatedPreviews);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div className="h-fit rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Product Form
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={form.name}
                    name="name"
                    type="text"
                    onChange={onChange}
                    placeholder="Enter your product title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Price <span className="text-meta-1">*</span>
                  </label>
                  <input
                    disabled={isLoading}
                    onChange={onChange}
                    value={form.price}
                    name="price"
                    type="number"
                    placeholder="0"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Company <span className="text-meta-1">*</span>
                  </label>
                  <input
                    disabled={isLoading}
                    type="text"
                    name="company"
                    onChange={onChange}
                    value={form.company}
                    placeholder="Enter your product company"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Image <span className="text-meta-1">*</span>
                  </label>
                  <input
                    disabled={isLoading}
                    name="files"
                    onChange={handleImage}
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full rounded-md border border-stroke p-2.5 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category <span className="text-meta-1">*</span>
                </label>

                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={form.categoryId}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        categoryId: event.target.value,
                      })
                    }
                    className={`// relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input 
                  dark:focus:border-primary ${null}`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      Select your subject
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className="text-body dark:text-bodydark"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="h-fit overflow-y-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Color Form
            </h3>
          </div>
          <div className="p-6.5">
            {colors.map((color, index) => (
              <div
                key={color.id}
                className="mb-4.5 flex flex-col gap-6 xl:flex-row"
              >
                <div className="w-full xl:w-1/6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Color {index + 1} <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="color"
                    disabled={isLoading}
                    onChange={(event) => handleOnChangeColor(index, event)}
                    value={color.color}
                    type="color"
                    className="h-[50px] w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-4/5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Quantity <span className="text-meta-1">*</span>
                  </label>
                  <input
                    disabled={isLoading}
                    type="number"
                    name="quantity"
                    value={color.quantity}
                    onChange={(event) => handleOnChangeColor(index, event)}
                    placeholder="0"
                    className="w-full rounded-md border border-stroke p-2.5 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>
                <div className="mt-5 flex w-full items-center justify-center xl:w-1/6">
                  <Button
                    disabled={isLoading}
                    onClick={() => handleDeleteColor(index)}
                    icon={<Trash2 size={18} />}
                    style="bg-danger text-white rounded hover:bg-opacity-90"
                  />
                </div>
              </div>
            ))}
            <button
              disabled={isLoading}
              onClick={handleAddColor}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add color
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 h-fit overflow-y-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Images</h3>
        </div>
        <div className="grid grid-cols-6 gap-5 px-5 py-5">
          {images.map((image, i) => (
            <div key={i} className="relative col-span-1 aspect-video">
              <Image
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_IMAGE + "/" + image
                }
                alt=""
                fill
                className="absolute object-cover"
              />
              <button
                disabled={isLoading}
                onClick={() => handleDeleteImage(image, i)}
                className="absolute -right-2 -top-2 rounded-full bg-danger p-1 text-white hover:bg-opacity-90"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
