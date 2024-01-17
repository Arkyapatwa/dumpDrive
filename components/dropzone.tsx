"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Dropzone from "react-dropzone";

const DropArea = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const onDrop = (selectedFiles: File[]) => {
    console.log(selectedFiles);
    selectedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File read was aborted");
      reader.onerror = () => console.log("File read error");

      reader.onload = async () => {
        await uploadFile(file);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    //firestore/storage path -> users/{user123}/files

    const firestoreDocRef = await addDoc(
      collection(db, "users", user.id, "files"),
      {
        // adding to firestore
        userId: user.id,
        fileName: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timestamp: serverTimestamp(), // sets the server time to maintain consistency
        type: selectedFile.type,
        size: selectedFile.size,
      }
    );

    const fileRef = ref(
      storage,
      `users/${user.id}/files/${firestoreDocRef.id}`
    ); // getting ref firestore so it can be uploaded to storage also

    uploadBytes(fileRef, selectedFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(fileRef);

      await updateDoc(doc(db, "users", user.id, "files", firestoreDocRef.id), {
        downloadUrl: downloadUrl
      });
    });

    setLoading(false);
  };

  // max size limit is 100MB
  const maxLimit = 104857600;

  return (
    <>
      <Dropzone
        minSize={0}
        maxSize={maxLimit}
        onDrop={onDrop}
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
                    : "bg-slate-100/50 dark:bg-slate-500/50 text-slate-400"
                )}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Drag and Drop Files Here"}
                {isDragActive && !isDragReject && "Drop File now"}
                {isDragReject && "File not Accepted"}
                {isFileLarge && (
                  <p className="p-1 border-red-700 text-red-700 bg-red-300">
                    File Too Large
                  </p>
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
