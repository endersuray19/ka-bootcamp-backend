import { supabase } from "@/lib/supabase";
import { File } from "formdata-node";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files provided" },
        { status: 400 }
      );
    }

    console.log("Files received:", files);

    let uploadResults: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        console.error("Invalid file type:", file);
        throw new Error("Invalid file type");
      }

      console.log("Processing file:", file.name);

      const fileName = `${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error(`Failed to upload ${file.name}: ${error.message}`);
      }

      uploadResults.push(data?.path);
    }

    return NextResponse.json({ uploadedFiles: uploadResults }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}