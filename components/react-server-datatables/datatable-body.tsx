import React from "react";
import { TableBody } from "../ui/table";

const DatatableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <TableBody ref={ref} className={className} {...props} />
));
DatatableBody.displayName = "DatatableBody";

export default DatatableBody;
