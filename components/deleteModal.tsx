"use client"

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { useToast } from "./ui/use-toast"
import { useState } from "react"

export function DeleteModal() {

    const { user } = useUser()
    const { toast } = useToast()
    const [success, setSuccess] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId] = useAppStore((state) => ([state.isDeleteModalOpen, state.setIsDeleteModalOpen, state.fileId]))

    async function deleteFile() {
        if (!user || !fileId) return;

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        try {
            await deleteObject(fileRef).then(async () => {  // deleteing from firebase storage
                await deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                    console.log("deleted!");
                    
                    toast({
                        title: "File deleted Successfully ✅"
                    })
                })
            }).finally(() => {
                setIsDeleteModalOpen(false);
                
            })
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={(isopen) => setIsDeleteModalOpen(isopen)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want delete?
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
            <Button className="px-3 flex-1" variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
            </Button>

            <Button className="px-3 flex-1" type="submit"
            onClick={() => deleteFile()}>
                Delete
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
