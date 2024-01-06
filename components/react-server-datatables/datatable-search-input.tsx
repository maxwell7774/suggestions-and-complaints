import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import DatatableParams from "./datatable-params";
import { cn } from "@/lib/utils";

interface Props extends React.TdHTMLAttributes<HTMLInputElement> {
  datatableParams: DatatableParams;
  setDatatableParams: (newDatatableParams: DatatableParams) => void;
}

const DatatableSearchInput = ({
  datatableParams,
  setDatatableParams,
  className,
}: Props) => {
  const [value, setValue] = useState<string>(datatableParams.searchTerm);

  const handleSearch = () => {
    if (value !== datatableParams.searchTerm) {
      setDatatableParams({ ...datatableParams, searchTerm: value, page: 1 });
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
      <Button size={"sm"} className="h-8" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default DatatableSearchInput;
