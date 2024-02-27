"use client";
import { db } from "@/firebase";
// import { useRouter } from 'next/router'

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { CollectionHook, useCollection } from "react-firebase-hooks/firestore";

const FilePage = ({ params }: { params: { id: string } }) => {
  // const router  = useRouter()
  const { user } = useUser();
  const [file, setFile] = useState<any>(null);

  // console.log(params)
  useEffect(() => {
    if (!user) return;

    const fetchFile = async () => {
      // const fileData = await query(collection(db, "users", user.id, "files", params.id))
      const fileDataRef = doc(
        collection(db, `users/${user.id}/files`),
        params.id
      );
      const fileDocSnapshot = await getDoc(fileDataRef);
      if (fileDocSnapshot) {
        setFile(fileDocSnapshot._document.data.value.mapValue.fields);
        console.log(fileDocSnapshot._document.data.value.mapValue.fields);
      }
    };

    fetchFile();
    // console.log(file)
  }, [user]);

  return (
    <div>
      
      <div>
        {/* <DocViewer documents={[file.downloadUrl]} pluginRenderers={DocViewerRenderers} /> */}
      </div>
    </div>
  );
};

export default FilePage;
