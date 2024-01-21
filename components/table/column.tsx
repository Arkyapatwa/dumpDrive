"use client";

import { colorExtension } from "@/extColor";
import { skeleton } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from 'react-file-icon';


export const columns: ColumnDef<skeleton>[] = [
  {
    accessorKey: "fileType",
    header: "type",
    cell: ({renderValue, ...props}) => {
        const type = renderValue() as string
        const extension = type.split("/")[1]
        return (
            <div className="w-10">
                <FileIcon 
                extension={extension}
                labelColor={colorExtension[extension]}
                />
            </div>
        )
    }
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      <a
        href={renderValue() as string}
        target="_blank"
        className="underline text-blue-500 hover:text-blue-600"
      >
        Download
      </a>;
    },
  },
];