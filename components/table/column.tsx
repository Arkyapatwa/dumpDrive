"use client";

import { colorExtension } from "@/extColor";
import { useAppStore } from "@/store/store";
import { skeleton } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { Download, PencilIcon } from "lucide-react";
import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

interface Column {
  accessorKey: string;
  header: string;
  cell: React.ComponentType<any>;
}

const MyColumn: React.FC<any> = ({ renderValue, row, ...props }) => {
  const [setFileId, setfileName, setIsRenameModalOpen] = useAppStore(
    (state) => [
      state.setFileId,
      state.setFileName,
      state.setIsRenameModalOpen,
    ]
  );

  const openRenameModal = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setfileName(fileName);
    setIsRenameModalOpen(true);
  };

  return (
    <div key={(row.original as skeleton).id} className="flex underline text-blue-500 cursor-pointer">
      <div className="flex" onClick={() => openRenameModal((row.original as skeleton).id, renderValue() as string)}>
        <span>{renderValue() as string}</span>
        <PencilIcon size={15} className="ml-2" />
      </div>
    </div>
  );
};

export const columns: ColumnDef<skeleton>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={colorExtension[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "Filename",
    cell: MyColumn,
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue, ...props }) => {
      return (
        <div className="flex flex-col">
          <span>{(renderValue() as Date).toLocaleDateString()}</span>
          <span className="text-xs">
            {(renderValue() as Date).toLocaleTimeString()}
          </span>
        </div>
      );
    },
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
    cell: ({ renderValue,row, ...props }) => {
      return (
        <Link
          // href={renderValue() as string}
          href={`/file/${(row.original as skeleton).id}`}
          target="_blank"
          className="underline hover:text-blue-500 hover:text-blue-600"
        >
          {/* Download */}
          <Download />
        </Link>
      );
    },
  },
];
