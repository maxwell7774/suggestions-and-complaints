import React from "react";
import { TableCell } from "../ui/table";

const DatatableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <TableCell ref={ref} className={className} {...props} />
));
DatatableCell.displayName = "DatatableCell";

export default DatatableCell;
