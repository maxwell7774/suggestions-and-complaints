import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, Info, Smile, XCircle } from "lucide-react";

interface ToastProps {
  toastId: string | number;
  description: string;
}

const defaultClassNames =
  "w-full shadow-sm flex items-center justify-between space-x-2 p-4 rounded-md border-none bg-accent text-accent-foreground";

const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};

export const ToastInfo = ({ toastId, description }: ToastProps) => {
  return (
    <div
      className={cn(
        defaultClassNames,
        "bg-soft-info text-soft-info-foreground"
      )}
    >
      <div className="flex items-center space-x-2 w-full">
        <Info className="min-h-4 min-w-4 w-4 h-4" />
        <div>{description}</div>
      </div>
      <Button
        className="h-min w-min py-0.5 px-1 bg-transparent border border-soft-info-foreground text-sm text-soft-info-foreground hover:bg-soft-info-foreground/10 hover:border-soft-info-foreground/80 hover:text-soft-info-foreground/80"
        onClick={() => dismissToast(toastId)}
      >
        Close
      </Button>
    </div>
  );
};

export const ToastSuccess = ({ toastId, description }: ToastProps) => {
  return (
    <div
      className={cn(
        defaultClassNames,
        "bg-soft-success text-soft-success-foreground"
      )}
    >
      <div className="flex items-center space-x-2 w-full">
        <CheckCircle className="min-h-4 min-w-4 w-4 h-4" />
        <div>{description}</div>
      </div>
      <Button
        className="h-min w-min py-0.5 px-1 bg-transparent border border-soft-success-foreground text-sm text-soft-success-foreground hover:bg-soft-success-foreground/10 hover:border-soft-success-foreground/80 hover:text-soft-success-foreground/80"
        onClick={() => dismissToast(toastId)}
      >
        Close
      </Button>
    </div>
  );
};

export const ToastWarning = ({ toastId, description }: ToastProps) => {
  return (
    <div
      className={cn(
        defaultClassNames,
        "bg-soft-warning text-soft-warning-foreground"
      )}
    >
      <div className="flex items-center space-x-2 w-full">
        <AlertTriangle className="min-h-4 min-w-4 w-4 h-4" />
        <div>{description}</div>
      </div>
      <Button
        className="h-min w-min py-0.5 px-1 bg-transparent border border-soft-warning-foreground text-sm text-soft-warning-foreground hover:bg-soft-warning-foreground/10 hover:border-soft-warning-foreground/80 hover:text-soft-warning-foreground/80"
        onClick={() => dismissToast(toastId)}
      >
        Close
      </Button>
    </div>
  );
};

export const ToastDestructive = ({ toastId, description }: ToastProps) => {
  return (
    <div
      className={cn(
        defaultClassNames,
        "bg-soft-destructive text-soft-destructive-foreground"
      )}
    >
      <div className="flex items-center space-x-2 w-full">
        <XCircle className="min-h-4 min-w-4 w-4 h-4" />
        <div>{description}</div>
      </div>
      <Button
        className="h-min w-min py-0.5 px-1 bg-transparent border border-soft-destructive-foreground text-sm text-soft-destructive-foreground hover:bg-soft-destructive-foreground/10 hover:border-soft-destructive-foreground/80 hover:text-soft-destructive-foreground/80"
        onClick={() => dismissToast(toastId)}
      >
        Close
      </Button>
    </div>
  );
};

export const ToastSecondary = ({ toastId, description }: ToastProps) => {
  return (
    <div
      className={cn(
        defaultClassNames,
        "bg-secondary text-secondary-foreground"
      )}
    >
      <div className="flex items-center space-x-2 w-full">
        <Smile className="min-h-4 min-w-4 w-4 h-4" />
        <div>{description}</div>
      </div>
      <Button
        className="h-min w-min py-0.5 px-1 bg-transparent border border-secondary-foreground text-sm text-secondary-foreground hover:bg-secondary-foreground/10 hover:border-secondary-foreground/80 hover:text-secondary-foreground/80"
        onClick={() => dismissToast(toastId)}
      >
        Close
      </Button>
    </div>
  );
};
