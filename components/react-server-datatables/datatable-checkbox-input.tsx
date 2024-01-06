"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import { useUpdateRow } from "./hooks/use-update-row";
import DatatableParams from "./datatable-params";

interface DatatableCheckboxInputProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  datatableParams: DatatableParams;
  item: any;
  propertyName: string;
  editMode?: boolean;
}

const DatatableCheckboxInput = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  DatatableCheckboxInputProps
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

    return (
      <Checkbox
        ref={ref}
        disabled={!editMode}
        {...props}
        onCheckedChange={(e) => {
          if (e !== props.defaultValue) {
            mutate({
              ...item,
              [propertyName]: e,
            });
          }
        }}
      />
    );
  }
);
DatatableCheckboxInput.displayName = "DatatableCheckboxInput";

export default DatatableCheckboxInput;
