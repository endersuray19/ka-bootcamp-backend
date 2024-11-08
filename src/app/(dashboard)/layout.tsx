import DefaultLayout from "@/components/Layouts/DefaultLayout";

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