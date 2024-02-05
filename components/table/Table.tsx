"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { skeleton } from "@/typings"
import { TrashIcon } from "lucide-react"
import { useAppStore } from "@/store/store"
import { DeleteModal } from "../deleteModal"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [fileId, setFileId, isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore((state) => [state.fileId, state.setFileId, state.isDeleteModalOpen, state.setIsDeleteModalOpen])

  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  }



  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                  <DeleteModal />

                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell key={(row.original as skeleton).id}>
                    <Button variant={'outline'}
                    onClick={()=> {
                        openDeleteModal((row.original as skeleton).id)
                    }}
                    >
                        <TrashIcon size={20} />
                    </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no Files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

  )
}
