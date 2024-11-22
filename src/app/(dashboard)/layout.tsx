import DefaultLayout from "@/components/Layouts/DefaultLayout";
import  { Metadata } from "next";
export const metadata:Metadata = {
    title:"Dashboard",
    description:"Dashboard"
}
export default function DashboardLayaout({
    children
}:{
    children:React.ReactNode;
}){
    return (
        <DefaultLayout>
        {children}
       </DefaultLayout>
    )

       
    
}