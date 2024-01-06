import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

interface Props {
  rows: number;
  cols: number;
}

const SkeletonRows = ({ rows, cols }: Props) => {
  let skeletonRows: React.ReactNode[] = [];

  for (let i = 0; i < rows; i++) {
    let skeletonCols: React.ReactNode[] = [];

    for (let j = 0; j < cols; j++) {
      skeletonCols.push(
        <TableCell>
          <Skeleton className="w-full h-5" />
        </TableCell>
      );
    }
    skeletonRows.push(<TableRow>{skeletonCols}</TableRow>);
  }

  return <>{skeletonRows}</>;
};

export default SkeletonRows;
