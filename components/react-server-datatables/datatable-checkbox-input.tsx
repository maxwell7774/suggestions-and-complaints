"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { Checkbox } from "../ui/checkbox";
import { useUpdateRow } from "./hooks/use-update-row";
import { Datatable } from ".";
import { toast } from "sonner";
import { ToastDestructive } from "../toast-variants";

interface DatatableCheckboxInputProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  datatable: Datatable;
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
      datatable: { apiUrl, primaryKeyField, zodSchema },
      className,
      editMode = false,
      item,
      propertyName,
      ...props
    },
    ref
  ) => {
    const { mutate } = useUpdateRow(apiUrl, primaryKeyField);

    const handleCheckedChanged = (e: CheckboxPrimitive.CheckedState) => {
      if (e !== props.defaultValue) {
        const updatedItem = { ...item, [propertyName]: e };

        const result = zodSchema.safeParse(updatedItem);

        if (result.success) {
          mutate(updatedItem);
        } else {
          toast.custom((toastId) => (
            <ToastDestructive toastId={toastId}>
              {result.error.errors.map((error) => (
                <p key={error.code}>{error.message}</p>
              ))}
            </ToastDestructive>
          ));
        }
      }
    };

    return (
      <Checkbox
        ref={ref}
        disabled={!editMode}
        {...props}
        onCheckedChange={handleCheckedChanged}
      />
    );
  }
);
DatatableCheckboxInput.displayName = "DatatableCheckboxInput";

export default DatatableCheckboxInput;
