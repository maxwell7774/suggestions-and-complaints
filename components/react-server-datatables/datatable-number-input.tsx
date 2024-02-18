import React from "react";
import { Input } from "../ui/input";
import { useUpdateRow } from "./hooks/use-update-row";
import { Datatable } from ".";
import { toast } from "sonner";
import { ToastDestructive } from "../toast-variants";

interface DatatableNumberInputProps
  extends React.TdHTMLAttributes<HTMLInputElement> {
  datatable: Datatable;
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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (Number(e.target.value) !== props.defaultValue) {
        const updatedItem = { ...item, [propertyName]: Number(e.target.value) };

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
        <Input
          className={className}
          type="number"
          {...props}
          ref={ref}
          onBlur={handleBlur}
        />
      );
    }
    return <div className={className}>{props.defaultValue}</div>;
  }
);
DatatableNumberInput.displayName = "DatatableNumberInputProps";

export default DatatableNumberInput;
