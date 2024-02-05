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

export function DeleteModal() {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore((state) => ([state.isDeleteModalOpen, state.setIsDeleteModalOpen]))

    const deleteFile = () => {

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
