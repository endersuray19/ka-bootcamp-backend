
import { createCategory } from "@/app/auth/_components/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "../_component/form";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Create Category",
  description:"create a category"
}

export default function CreateCategory(){ 
   
    return(
        <div>
            <Breadcrumb pageName="Create Category" />
            <Form/>
        </div>
    )
}