
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
export async function DELETE(request:Request,{params}:{params:{filename:string}}) {
    try{
        const {filename} = params;

        const{data, error} =  await supabase.storage.from("images").remove([filename]);
        return NextResponse.json({message:"File deleted successfully",success:true}, {status:200});
    }
    catch(error){
        return NextResponse.json({error}, {status:500});
    }
   
} 