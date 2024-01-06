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
import DatatableParams from "./datatable-params";

interface DatatableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  propertyName: string;
  datatableParams: DatatableParams;
  isSearchable?: boolean;
  setDatatableParams: (newSearchParams: DatatableParams) => void;
}

const DatatableHead = React.forwardRef<
  HTMLTableCellElement,
  DatatableHeadProps
>(
  (
    {
      datatableParams,
      propertyName,
      isSearchable = false,
      setDatatableParams,
      className,
      ...props
    },
    ref
  ) => {
    const handleSort = () => {
      if (datatableParams.sortCol !== propertyName) {
        setDatatableParams({
          ...datatableParams,
          sortCol: propertyName,
          sortDir: "asc",
        });
      } else if (datatableParams.sortDir === "asc") {
        setDatatableParams({ ...datatableParams, sortDir: "desc" });
      } else if (datatableParams.sortDir === "desc") {
        setDatatableParams({ ...datatableParams, sortDir: "asc" });
      }
    };

    return (
      <TableHead ref={ref} className={className} {...props}>
        <div className="flex items-center justify-between w-full h-full space-x-2">
          {props.children}
          <div className="flex items-center space-x-2">
            {isSearchable && (
              <div
                onClick={() =>
                  setDatatableParams({
                    ...datatableParams,
                    searchCol: propertyName,
                  })
                }
                className={cn(
                  "flex items-center justify-center hover:cursor-pointer hover:text-muted-foreground transition-colors text-muted",
                  datatableParams.searchCol === propertyName &&
                    "text-muted-foreground"
                )}
              >
                <Search className="w-4 h-4 min-w-4 min-h-4" />
              </div>
            )}
            <div
              onClick={handleSort}
              className={cn(
                "flex items-center justify-center hover:cursor-pointer hover:text-muted-foreground transition-colors text-muted",
                datatableParams.sortCol === propertyName &&
                  "text-muted-foreground"
              )}
            >
              {datatableParams.sortCol === propertyName &&
                datatableParams.sortDir === "asc" && (
                  <ChevronDown className="w-4 h-4 min-w-4 min-h-4" />
                )}
              {datatableParams.sortCol === propertyName &&
                datatableParams.sortDir === "desc" && (
                  <ChevronUp className="w-4 h-4 min-w-4 min-h-4" />
                )}
              {datatableParams.sortCol !== propertyName && (
                <ChevronsUpDown className="w-4 h-4 min-w-4 min-h-4" />
              )}
            </div>
          </div>
        </div>
      </TableHead>
    );
  }
);
DatatableHead.displayName = "DatatableHead";

export default DatatableHead;
