import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useUpdateRow } from "./hooks/use-update-row";
import DatatableParams from "./datatable-params";

interface DatatableNumberInputProps
  extends React.TdHTMLAttributes<HTMLInputElement> {
  datatableParams: DatatableParams;
  item: any;
  propertyName: string;
  editMode?: boolean;
}

const DatatableNumberInput = React.forwardRef<
  HTMLInputElement,
  DatatableNumberInputProps
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
          type="number"
          {...props}
          ref={ref}
          onBlur={(e) => {
            if (Number(e.target.value) !== props.defaultValue) {
              mutate({
                ...item,
                [propertyName]: Number(e.target.value),
              });
            }
          }}
        />
      );
    }
    return <div className={className}>{props.defaultValue}</div>;
  }
);
DatatableNumberInput.displayName = "DatatableNumberInputProps";

export default DatatableNumberInput;
