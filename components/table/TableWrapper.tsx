"use client";

import React, { useEffect, useState } from "react";
import { skeleton } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./column";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Skeleton } from "@/components/ui/skeleton";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: skeleton[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<skeleton[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user && (
        query(collection(db, "users", user.id, "files"), orderBy("timestamp", sort))
    )
  );

  useEffect(() => {
    if (!docs) return;

    const files: skeleton[] = docs.docs.map((doc) => ({
      id: doc.id,
      fileName: doc.data().fileName,
      fullName: doc.data().fullName,
      downloadUrl: doc.data().downloadUrl,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      type: doc.data().type,
      size: doc.data().size,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="w-36 h-10 mb-5 ml-auto">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div className="flex items-center w-full p-5 gap-4" key={file.id}>
              <Skeleton className="w-12 h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          ))}

          {skeletonFiles.length == 0 && (
            <div className="flex items-center w-full p-5 gap-4" key={file.id}>
              <Skeleton className="w-12 h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row-reverse my-4 ">
        <Button variant={"outline"}
        className="w-36"
          onClick={() => (sort == "asc" ? setSort("desc") : setSort("asc"))}
        >
          {" "}
          Sort By: {sort == "asc" ? "Newest" : "Oldest"}{" "}
        </Button>
      </div>
      {/* Data Table */}
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
