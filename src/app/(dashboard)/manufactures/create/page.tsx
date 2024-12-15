
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Form from "../_component/form";
import { Metadata } from "next";
export const metadata:Metadata = {
  title:"Create Manufacture ",
  description:"Create a Manufacture"
}
export default function CreateManufacture(){
    return(
        <div>
            <Breadcrumb pageName="Create Manufacture"/>
            <Form/>
        </div>
    )
}
