"use client";
import React, { useState } from "react";
import { useUpdateRow } from "./hooks/use-update-row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X } from "lucide-react";
import { Datatable } from ".";
import { TypeOf, ZodSchema, z } from "zod";
import { toast } from "sonner";
import { ToastDestructive } from "../toast-variants";
import { error } from "console";

interface KeyValue {
  label: string;
  value: string;
}

interface DatatableSelectInputProps
  extends React.TdHTMLAttributes<HTMLInputElement> {
  datatable: Datatable;
  item: any;
  propertyName: string;
  defaultValue: any;
  values: KeyValue[];
  editMode?: boolean;
  clearButton?: boolean;
}

const DatatableSelectInput = React.forwardRef<
  HTMLInputElement,
  DatatableSelectInputProps
>(
  (
    {
      datatable: { apiUrl, primaryKeyField, zodSchema },
      values,
      className,
      editMode = false,
      clearButton = false,
      item,
      propertyName,
      ...props
    },
    ref
  ) => {
    const { mutate } = useUpdateRow(apiUrl, primaryKeyField);

    const handleValueChange = (newValue: string) => {
      // const typeOfProperty = typeof item[propertyName];

      let newValueParsed: any = newValue ? newValue : null;

      if (Number(newValue)) {
        newValueParsed = Number(newValue);
      } else if (Boolean(newValue)) {
        newValueParsed = newValue === "true" ? true : false;
      }

      const newItem = {
        ...item,
        [propertyName]: newValueParsed,
      };

      const result = zodSchema.safeParse(newItem);

      if (result.success) {
        mutate(newItem);
      } else {
        toast.custom((toastId) => (
          <ToastDestructive toastId={toastId}>
            {result.error.errors.map((error) => (
              <p key={error.code}>{error.message}</p>
            ))}
          </ToastDestructive>
        ));
      }
    };

    if (editMode) {
      return (
        <div className="flex space-x-1 items-center">
          <Select
            value={props.defaultValue?.toString()}
            onValueChange={handleValueChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {values.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {clearButton && (
            <X
              className="w-4 h-4 min-h-4 min-w-4 text-muted-foreground hover:text-foreground hover:cursor-pointer"
              onClick={() => {
                handleValueChange("");
              }}
            />
          )}
        </div>
      );
    }
    return (
      <div className={className}>
        {
          values.find(({ value }) => value === props.defaultValue?.toString())
            ?.label
        }
      </div>
    );
  }
);
DatatableSelectInput.displayName = "DatatableSelectInput";

export default DatatableSelectInput;
