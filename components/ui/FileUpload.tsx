"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { Divide, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import "@uploadthing/react/styles.css";


interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  value,
  onChange,
}) => {
    const fileType = value?.split(".").pop()
    if(value && fileType !== 'pdf'){
        return (
            <div className="relative h-20 w-20">
                <Image src={value} fill alt="image" className="rounded-full" />
                <button className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button" onClick={() => onChange("")}>
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    if(value && fileType === 'pdf'){
        return (
            <div>
                pdf file
            </div>
        )
    }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
export default FileUpload;
