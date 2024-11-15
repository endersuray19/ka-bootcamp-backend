"use client"
import { createCategory } from "@/app/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "../_component/form";

export default function CreateSerie(){
    return(
        <div>
            <Breadcrumb pageName="Create Serie"/>
            <Form/>
        </div>
    )
}
