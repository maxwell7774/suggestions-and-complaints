import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useUpdateRow } from "./hooks/use-update-row";
import DatatableParams from "./datatable-params";

interface DatatableTextInputProps
  extends React.TdHTMLAttributes<HTMLInputElement> {
  datatableParams: DatatableParams;
  item: any;
  propertyName: string;
  editMode?: boolean;
}

const DatatableTextInput = React.forwardRef<
  HTMLInputElement,
  DatatableTextInputProps
>(
  (
    {
      datatableParams,
      className,
      editMode = false,
      item,
      propertyName,
      ...props
    },
    ref
  ) => {
    const { mutate } = useUpdateRow(datatableParams);

    if (editMode) {
      return (
        <Input
          className={className}
          type="text"
          {...props}
          ref={ref}
          onBlur={(e) => {
            if (e.target.value !== props.defaultValue) {
              mutate({
                ...item,
                [propertyName]: e.target.value,
              });
            }
          }}
        />
      );
    }
    return <div className={className}>{props.defaultValue}</div>;
  }
);
DatatableTextInput.displayName = "DatatableTextInput";

export default DatatableTextInput;
