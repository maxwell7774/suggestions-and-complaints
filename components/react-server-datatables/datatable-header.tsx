import React from "react";
import { TableHeader } from "../ui/table";

const DatatableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <TableHeader ref={ref} className={className} {...props} />
));
DatatableHeader.displayName = "DatatableHeader";

export default DatatableHeader;
