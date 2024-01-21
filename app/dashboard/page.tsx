import DropArea from "@/components/dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { skeleton } from "@/typings";
import { UserButton, auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

const Dashboard = async () => {
  const { userId } = auth();

  const fetchedFiles = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: skeleton[] = fetchedFiles.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName,
    fullName: doc.data().fullName,
    downloadUrl: doc.data().downloadUrl,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    type: doc.data().type,
    size: doc.data().size,
  }));

  // console.log(skeletonFiles)

  return (
    <>
      <div className="border-t">
        <DropArea />
        <section className="container space-y-5">
            <h2 className="font-bold">All Files</h2>
            <TableWrapper skeletonFiles={skeletonFiles} />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
