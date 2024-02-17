"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Datatable, SearchFilter } from ".";

interface DropdownItem {
  label: string;
  value: string;
}

interface DatatableColumnCategorySelectProps {
  propertyName: string;
  datatable: Datatable;
  values: DropdownItem[];
}

const DatatableColumnCategorySelect = ({
  propertyName,
  values,
  datatable: {
    addSearchFilter,
    removeSearchFilter,
    removeSearchFiltersByFieldAndOperator,
    isSearchFilterWithFieldAndOperatorSet,
    firstPage,
  },
}: DatatableColumnCategorySelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const isActive = isSearchFilterWithFieldAndOperatorSet(propertyName, "eq");

  const onCheckboxSelected = (value: string, isChecked: boolean) => {
    if (isChecked && !selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
      addSearchFilter({ field: propertyName, operator: "eq", value: value });
    } else {
      setSelectedValues([
        ...selectedValues.filter((selectedValue) => selectedValue !== value),
      ]);
      removeSearchFilter({ field: propertyName, operator: "eq", value: value });
    }
  };

  const handleClear = () => {
    setSelectedValues([]);
    removeSearchFiltersByFieldAndOperator(propertyName, "eq");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-center hover:cursor-pointer hover:text-muted-foreground transition-colors  text-muted-foreground/30",
            isActive && "text-muted-foreground"
          )}
        >
          <Filter className="w-4 h-4 min-w-4 min-h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {values.map(({ value, label }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedValues.includes(value)}
            onCheckedChange={(isChecked) => {
              onCheckboxSelected(value, isChecked);
            }}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuItem className="p-1">
          <Button size={"sm"} className="w-full" onClick={handleClear}>
            Clear
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DatatableColumnCategorySelect;
