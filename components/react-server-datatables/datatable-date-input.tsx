import React from "react";
import { Input } from "../ui/input";
import { useUpdateRow } from "./hooks/use-update-row";
import DatatableParams from "./datatable-params";

interface DatatableDateInputProps
  extends React.TdHTMLAttributes<HTMLInputElement> {
  datatableParams: DatatableParams;
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
          type="date"
          {...props}
          ref={ref}
          onChange={(e) => {
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
    return <div>{props.defaultValue}</div>;
  }
);
DatatableDateInput.displayName = "DatatableDateInput";

export default DatatableDateInput;
