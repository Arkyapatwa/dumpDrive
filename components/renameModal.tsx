"use client"

import { useUser } from "@clerk/nextjs"
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
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/firebase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Input } from "./ui/input"
import { useState } from "react"
import { useToast } from "./ui/use-toast"


const RenameModal = () => {

    const { user } = useUser()
    const { toast } = useToast()
    const [ input, setInput ] = useState("")
    const [isRenameModalOpen, setRenameModalOpen, fileId] = useAppStore((state) => [state.isRenameModalOpen, state.setIsRenameModalOpen, state.fileId])

    async function renameFile() {
        if (!user || !fileId) return;

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            fileName: input,
        })

        setInput("");
        setRenameModalOpen(false);
        toast({
            title: "File renamed Successfully ✅"
        })
    }

  return (
    <Dialog open={isRenameModalOpen} onOpenChange={(isopen) => setRenameModalOpen(isopen)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
          <DialogDescription>
            <Input 
            id="link"
            onChange={(event) => setInput(event.target.value)}
            onKeyDownCapture={(event) => {
                if(event.key === "Enter") {
                    renameFile();
                }
            }}
            />
          </DialogDescription>

        <div className="flex space-x-2 py-3">
            <Button className="px-3 flex-1" variant={"ghost"}
            onClick={() => setRenameModalOpen(false)}>
                Cancel
            </Button>

            <Button className="px-3 flex-1" type="submit"
            onClick={() => renameFile()}>
                Rename
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal