"use client"
import { createCategory } from "@/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "./_component/form";

export default function CreateCategory(){ 
   
    return(
        <div>
            <Breadcrumb pageName="Create Category" />
            <Form/>
        </div>
    )
}