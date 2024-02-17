import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Datatable } from ".";

interface Props extends React.TdHTMLAttributes<HTMLInputElement> {
  datatable: Datatable;
}

const DatatableSearchInput = ({
  datatable: { searchTerm, setSearchTerm, firstPage },
  className,
}: Props) => {
  const [value, setValue] = useState<string>(searchTerm);

  const handleSearch = () => {
    if (value !== searchTerm) {
      setSearchTerm(value);
      firstPage();
    }
  };

  return (
    <div className={cn("flex gap-x-2 items-end", className)}>
      <Input
        className="h-8"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search..."
      />
      <Button size={"sm"} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default DatatableSearchInput;
