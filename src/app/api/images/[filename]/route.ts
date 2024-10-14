import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { filename: string } },
) {
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .remove([params.filename]);

    return NextResponse.json(null, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
