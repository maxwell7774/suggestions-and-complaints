"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { TableRow } from "../ui/table";

const DatatableHeaderRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  return (
    <TableRow
      ref={ref}
      className={cn("hover:bg-background", className)}
      {...props}
    />
  );
});
DatatableHeaderRow.displayName = "DatatableHeaderRow";

export default DatatableHeaderRow;
