"use client";

import { colorExtension } from "@/extColor";
import { useAppStore } from "@/store/store";
import { skeleton } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from 'react-file-icon';


export const columns: ColumnDef<skeleton>[] = [

  {
    accessorKey: "type",
    header: "Type",
    cell: ({renderValue, ...props}) => {
        const type = renderValue() as string
        const extension: string = type.split("/")[1]
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
    accessorKey: "fileName",
    header: "Filename",
    cell: ({renderValue, ...props}) => {
      return (
        <div className="flex underline text-blue-500 cursor-pointer">
          <span>{(renderValue() as string)}</span>
          <span onClick={() => {
            
          }}>
            <PencilIcon size={15} className="ml-2" />
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({renderValue, ...props}) => {
        return (
            <div className="flex flex-col">
                <span>{(renderValue() as Date).toLocaleDateString()}</span>
                <span className="text-xs">{(renderValue() as Date).toLocaleTimeString()}</span>
            </div>
        )
    }
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
      return <a
        href={renderValue() as string}
        target="_blank"
        className="underline text-blue-500 hover:text-blue-600"
      >
        Download
      </a>;
    },
  },
];
