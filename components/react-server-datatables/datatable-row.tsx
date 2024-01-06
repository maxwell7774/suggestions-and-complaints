"use client";
import React from "react";
import { TableRow } from "../ui/table";

interface DatatableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  rowdata: any;
}

const DatatableRow = React.forwardRef<HTMLTableRowElement, DatatableRowProps>(
  ({ className, ...props }, ref) => {
    return <TableRow ref={ref} className={className} {...props} />;
  }
);
DatatableRow.displayName = "DatatableRow";

export default DatatableRow;
