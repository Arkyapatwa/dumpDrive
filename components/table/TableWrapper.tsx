import React from "react";
import { skeleton } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./column";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: skeleton[] }) => {
  return (
    <div>
      <div className="flex flex-row-reverse my-4">
        <Button>Sort By...</Button>
      </div>
      {/* Data Table */}
      <DataTable columns={columns} data={skeletonFiles} />
    </div>
  );
};

export default TableWrapper;
