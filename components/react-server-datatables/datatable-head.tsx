import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Filter,
  Search,
} from "lucide-react";
import React from "react";
import { TableHead } from "../ui/table";
import { Datatable } from ".";

interface DatatableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  propertyName: string;
  title: string;
  datatable: Datatable;
  disableSort?: boolean;
}

const DatatableHead = React.forwardRef<
  HTMLTableCellElement,
  DatatableHeadProps
>(
  (
    {
      title,
      propertyName,
      disableSort = false,
      datatable: { sortBy, sortDir, setSortBy, setSortDir },
      className,
      ...props
    },
    ref
  ) => {
    const handleSort = () => {
      if (sortBy !== propertyName) {
        setSortBy(propertyName);
        setSortDir("asc");
      } else if (sortDir === "asc") {
        setSortDir("desc");
      } else if (sortDir === "desc") {
        setSortDir("asc");
      }
    };

    return (
      <TableHead ref={ref} className={className} {...props}>
        <div className="flex items-center justify-between w-full h-full">
          <span>{title}</span>
          <div className="ml-2 flex items-center space-x-2">
            {props.children}
            {!disableSort && (
              <div
                onClick={handleSort}
                className={cn(
                  "flex items-center justify-center hover:cursor-pointer hover:text-muted-foreground transition-colors text-muted-foreground/30",
                  sortBy === propertyName && "text-muted-foreground"
                )}
              >
                {sortBy === propertyName && sortDir === "asc" && (
                  <ChevronDown className="w-4 h-4 min-w-4 min-h-4" />
                )}
                {sortBy === propertyName && sortDir === "desc" && (
                  <ChevronUp className="w-4 h-4 min-w-4 min-h-4" />
                )}
                {sortBy !== propertyName && (
                  <ChevronsUpDown className="w-4 h-4 min-w-4 min-h-4" />
                )}
              </div>
            )}
          </div>
        </div>
      </TableHead>
    );
  }
);
DatatableHead.displayName = "DatatableHead";

export default DatatableHead;
