import * as React from "react";
import { Table } from "../ui/table";

const Datatable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <Table ref={ref} className={className} {...props} />
));
Datatable.displayName = "Datatable";

export default Datatable;
