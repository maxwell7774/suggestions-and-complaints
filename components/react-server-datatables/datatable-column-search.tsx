import { Search } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Datatable } from ".";

interface DatatableColumnSearchProps {
  propertyName: string;
  datatable: Datatable;
}

const DatatableColumnSearch = ({
  propertyName,
  datatable: { addSearchField, removeSearchField, isSearchFieldSet, firstPage },
}: DatatableColumnSearchProps) => {
  const handleSearch = () => {
    if (isSearchFieldSet(propertyName)) {
      removeSearchField(propertyName);
    } else {
      addSearchField(propertyName);
      firstPage();
    }
  };

  return (
    <div
      onClick={handleSearch}
      className={cn(
        "flex items-center justify-center hover:cursor-pointer hover:text-muted-foreground transition-colors  text-muted-foreground/30",
        isSearchFieldSet(propertyName) && "text-muted-foreground"
      )}
    >
      <Search className="w-4 h-4 min-w-4 min-h-4" />
    </div>
  );
};

export default DatatableColumnSearch;
