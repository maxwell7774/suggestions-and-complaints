import { Pencil } from "lucide-react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import React from "react";
import { Toggle } from "../ui/toggle";
import { cn } from "@/lib/utils";
import DatatableParams from "./datatable-params";

interface DatatableEditModeToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  editMode: boolean;
  setEditMode: (newEditMode: boolean) => void;
}

const DatatableEditModeToggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  DatatableEditModeToggleProps
>(({ editMode, setEditMode, className, ...props }, ref) => (
  <Toggle
    variant={"outline"}
    pressed={editMode}
    onPressedChange={(pressed) => setEditMode(pressed)}
    ref={ref}
    className={cn("w-8 h-8", className)}
    {...props}
  >
    <Pencil className="min-w-4 min-h-4 h-4 w-4" />
  </Toggle>
));

DatatableEditModeToggle.displayName = "DatatableEditModeToggle";

export default DatatableEditModeToggle;
