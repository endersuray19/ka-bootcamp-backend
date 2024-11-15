
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
export async function GET( request:Request, {params}:{params:{filename:string}}) {
    const {data,error} = await supabase.storage.from("images").remove([params.filename]);

    return NextResponse.json({data,error}, {status:200});
}