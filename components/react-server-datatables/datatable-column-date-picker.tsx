"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Datatable } from ".";

interface DatatableColumnDatePickerProps {
  propertyName: string;
  datatable: Datatable;
}

export default function DatatableColumnDatePicker({
  propertyName,
  datatable: {
    searchFilters,
    setSearchFilters,
    removeSearchFiltersByField,
    isSearchFilterWithFieldSet,
    firstPage,
  },
}: DatatableColumnDatePickerProps) {
  const [range, setDateRange] = React.useState<DateRange | undefined>();

  const handleDateRangeSelected = (open: boolean) => {
    if (!open) {
      if (range && range.from && range.to) {
        setSearchFilters([
          ...searchFilters.filter(
            (searchFilter) => searchFilter.field !== propertyName
          ),
          {
            field: propertyName,
            operator: "gte",
            value: format(range.from, "yyyy-MM-dd"),
          },
          {
            field: propertyName,
            operator: "lte",
            value: format(range.to, "yyyy-MM-dd"),
          },
        ]);
        firstPage();
      } else if (range && range.from && !range.to) {
        setSearchFilters([
          ...searchFilters.filter(
            (searchFilter) => searchFilter.field !== propertyName
          ),
          {
            field: propertyName,
            operator: "eq",
            value: format(range.from, "yyyy-MM-dd"),
          },
        ]);

        firstPage();
      } else {
        removeSearchFiltersByField(propertyName);
      }
    }
  };

  return (
    <Popover onOpenChange={handleDateRangeSelected}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-center hover:cursor-pointer hover:text-muted-foreground transition-colors  text-muted-foreground/30",
            isSearchFilterWithFieldSet(propertyName) && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 min-w-4 min-h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setDateRange}
          initialFocus
        />
        <div className="p-2">
          <Button
            disabled={!range}
            className="w-full"
            onClick={() => setDateRange(undefined)}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
