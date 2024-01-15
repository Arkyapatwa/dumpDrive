"use client";

import { cn } from "@/lib/utils";
import Dropzone from "react-dropzone";

const DropArea = () => {
  // max size limit is 100MB
  const maxLimit = 104857600;

  return (
    <>
      <Dropzone
        minSize={0}
        maxSize={maxLimit}
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
        }) => {
          const isFileLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > maxLimit;

          return (
            <section className="m-5">
              <div
                {...getRootProps()}
                className={cn(
                  "w-full h-52 flex justify-center items-center p-5 border border-dashed text-center rounded-lg",
                  isDragActive
                    ? "bg-red-700 text-white animate-pulse"
                    : "bg-slate-100/50 dark:bg-slate-500/50 text-slate-400",
                )}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Drag and Drop Files Here"}
                {isDragActive && !isDragReject && "Drop File now"}
                {isDragReject && "File not Accepted"}
                {isFileLarge && (
                    <p className="p-1 border-red-700 text-red-700 bg-red-300">File Too Large</p>
                )}
              </div>
            </section>
          );
        }}
      </Dropzone>
    </>
  );
};

export default DropArea;
