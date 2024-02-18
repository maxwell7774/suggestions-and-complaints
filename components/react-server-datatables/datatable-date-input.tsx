import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { useUpdateRow } from "./hooks/use-update-row";
import { Datatable } from ".";
import { toast } from "sonner";
import { ToastDestructive } from "../toast-variants";

interface DatatableDateInputProps
  extends React.TdHTMLAttributes<HTMLInputElement> {
  datatable: Datatable;
  item: any;
  propertyName: string;
  editMode?: boolean;
}

const DatatableDateInput = React.forwardRef<
  HTMLInputElement,
  DatatableDateInputProps
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

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== props.defaultValue) {
        const updatedItem = {
          ...item,
          [propertyName]: e.target.value,
        };

        const result = zodSchema.safeParse(updatedItem);

        if (result.success) {
          mutate(updatedItem);
        } else {
          // toast.custom((toastId) => (
          //   <ToastDestructive toastId={toastId}>
          //     {result.error.errors.map((error) => (
          //       <p key={error.code}>{error.message}</p>
          //     ))}
          //   </ToastDestructive>
          // ));
        }
      }
    };

    if (editMode) {
      return (
        <Input type="date" {...props} ref={ref} onChange={handleValueChange} />
      );
    }
    return <div>{props.defaultValue}</div>;
  }
);
DatatableDateInput.displayName = "DatatableDateInput";

export default DatatableDateInput;
