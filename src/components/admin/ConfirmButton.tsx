import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmButtonProps = Omit<ButtonProps, "onClick" | "title"> & {
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
};

/** A button that asks before running an action that is hard to undo or affects real users. */
const ConfirmButton = ({
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  children,
  variant,
  ...buttonProps
}: ConfirmButtonProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant={variant} {...buttonProps}>
        {children}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className={cn(variant === "destructive" && buttonVariants({ variant: "destructive" }))}
        >
          {confirmLabel}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default ConfirmButton;
