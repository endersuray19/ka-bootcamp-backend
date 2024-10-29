import { NextResponse } from "next/server";

export function responeses({data, success, message,status}:{
    data:any;
    success:boolean;
    message:string;
    status:number;
}){
    return NextResponse.json({
        data: data,
        success: success,
        message: message,
      },{
      status:status,
     });
}