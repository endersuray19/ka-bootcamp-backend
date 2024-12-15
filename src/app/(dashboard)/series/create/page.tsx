
import { createCategory } from "@/app/auth/_components/actions";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "../_component/form";
import { Metadata } from "next";
export const metadata:Metadata = {
    title:"Create Serie",
    description:"Creae a Serie"
  }
export default function CreateSerie(){
    return(
        <div>
            <Breadcrumb pageName="Create Serie"/>
            <Form/>
        </div>
    )
}
